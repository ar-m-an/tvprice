import time
from crawler.models import Vendor, ListPage, Product
from crawler.tools.abstractcrawler import AbstractCrawler
from crawler.tools.digikala import filters
from selenium.webdriver.common.action_chains import ActionChains

class DigiCrawler(AbstractCrawler):

    def __init__(self):
        super()
        self.vendor = Vendor.objects.update_or_create(
            name='digikala',
            start_url = r'https://www.digikala.com/search/category-tv2',
        )
        self.driver = super.create_driver()

    def get_pagination_urls(self):
        print('<CRAWLER> - GETTING PAGINATION URLS.')
        self.driver.get(self.vendor.start_url)

        # Create pagination urls based on max page numbers
        max_pages = int(driver.find_element_by_css_selector('.pagination__item--active').text)
        url_pattern = 'https://www.digikala.com/Search/Category-tv2/?pageno=%d'
        urls = [url_pattern % (i+1) for i in range(0, max_pages)]

        print('<CRAWLER> - PAGINATION URLS CREATED:')
        for url in urls:
            ListPage.objects.update_or_create(url=url, vendor=self.vendor)

    def get_product_listings(self, list_page):
        page_url = list_page.url

        print('<CRAWLER> - LISTING ALL PRODUCTS IN PAGE [%s].' % page_url)
        self.driver.get(page_url)

        products = self.driver.find_elements_by_css_selector('.products__item')
        actions = ActionChains(self.driver)
        for product in products:
            actions.move_to_element(product).perform()
        time.sleep(1)

        titles = self.driver.find_elements_by_css_selector('.products__item-fatitle')
        prices = self.driver.find_elements_by_css_selector('.products__item-price--final')
        images = self.driver.find_elements_by_css_selector('.products__item-image')

        print('<CRAWLER> - %d PRODUCTS FOUND IN PAGE [%s]:' % (len(titles), page_url))

        for i in range(len(titles)):
            try:
                price = int(prices[i].text.split(' ')[0].replace(',', ''))
            except:
                price = 0
            title = titles[i].text
            url = titles[i].get_attribute('href')
            image = images[i].get_attribute('src')

            Product.objects.update_or_create(
                title=title,
                price=price,
                vendor=self.vendor.name,
                url=url,
                image=image
            )

    def get_single_product(self, product):
        self.driver.get(product.url)
        funcs = filters.filter_funcs()
        spec = {}
        for spec_filter in funcs:
            spec.update(spec_filter(self.driver))

        product.spec = spec
        product.save()
