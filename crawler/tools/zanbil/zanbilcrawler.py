import time
from crawler.models import Vendor, ListPage, Product
from crawler.tools.abstractcrawler import AbstractCrawler
from crawler.tools.digikala import filters
from selenium.webdriver.common.action_chains import ActionChains


class ZanbilCrawler(AbstractCrawler):

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

        # Select and click last page button on pagination
        elem = self.driver.find_element_by_css_selector('div.pagination li:last-child a')
        self.driver.execute_script('arguments[0].click()', elem)
        time.sleep(1)

        # Create urls for pagination
        max_pages = int(self.driver.find_element_by_css_selector('div.pagination li.active a').text)
        url_pattern = 'https://www.zanbil.ir/filter?f=p65&page=%d'
        urls = [url_pattern % i for i in range(0, max_pages)]

        print('<CRAWLER> - PAGINATION URLS CREATED:')
        for url in urls:
            ListPage.objects.update_or_create(url=url, vendor=self.vendor)

    def get_product_listings(self, list_page):
        page_url = list_page.url

        print('<CRAWLER> - LISTING ALL PRODUCTS IN PAGE [%s].' % page_url)
        self.driver.get(page_url)

        self.driver.implicitly_wait(1)
        products = self.driver.find_elements_by_css_selector('ul.showbiz li.span3')
        actions = ActionChains(self.driver)
        for product in products:
            actions.move_to_element(product).perform()
        time.sleep(1)

        titles_main = self.driver.find_elements_by_css_selector('ul.showbiz li.span3 .title>h4>span:first-child')
        titles_model = self.driver.find_elements_by_css_selector('ul.showbiz li.span3 .title>h4>span:last-child')
        links = self.driver.find_elements_by_css_selector('ul.showbiz li.span3 a')
        prices = self.driver.find_elements_by_css_selector('ul.showbiz li.span3 .title .price')
        images = self.driver.find_elements_by_css_selector('ul.showbiz li.span3 a>img')

        print('<CRAWLER> - %d PRODUCTS FOUND IN PAGE [%s]:' % (len(titles_main), page_url))

        for i in range(len(titles_main)):
            try:
                price = int(prices[i].text.split(' ')[-2].replace(',', ''))
            except:
                price = 0
            title = titles_main[i].text + titles_model[i].text
            url = links[i].get_attribute('href')
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
