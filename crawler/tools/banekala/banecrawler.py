import time
from crawler.models import Vendor, ListPage, Product
from crawler.tools.abstractcrawler import AbstractCrawler
from crawler.tools.banekala import filters

class BaneCrawler(AbstractCrawler):

    def __init__(self):
        super()
        self.vendor = Vendor.objects.update_or_create(
            name='banekala',
            start_url = 'http://banekala.ir/AllProducts/259/group/groupID/%D8%AA%D9%84%D9%88%DB%8C%D8%B2%DB%8C%D9%88%D9%86/?MinPrice=0&MaxPrice=36100000&TakeItems=20&Page=1&IsAvailable=true&MySortID=NewProduct&MyOrderBy=desc&',
        )
        self.driver = super.create_driver()

    def get_pagination_urls(self):
        print('<CRAWLER> - GETTING PAGINATION URLS.')
        self.driver.get(self.vendor.start_url)

        # Create pagination urls based on max page numbers
        max_pages = int(self.driver.find_element_by_css_selector('ul.pagination li:last-child a').text)
        url_pattern = 'http://banekala.ir/AllProducts/259/group/groupID/%D8%AA%D9%84%D9%88%DB%8C%D8%B2%DB%8C%D9%88%D9%86/?MinPrice=0&MaxPrice=100000000&TakeItems=20&IsAvailable=true&MySortID=NewProduct&MyOrderBy=desc&Page='
        urls = [url_pattern + str(i + 1) for i in range(0, max_pages)]

        print('<CRAWLER> - PAGINATION URLS CREATED:')
        for url in urls:
            ListPage.objects.update_or_create(url=url, vendor=self.vendor)

    def get_product_listings(self, list_page):
        page_url = list_page.url

        print('<CRAWLER> - LISTING ALL PRODUCTS IN PAGE [%s].' % page_url)
        self.driver.get(page_url)
        time.sleep(1)

        titles = self.driver.find_elements_by_css_selector('ul.list-item li.item a.grid .type')
        links = self.driver.find_elements_by_css_selector('ul.list-item li.item a.grid')
        prices = self.driver.find_elements_by_css_selector('ul.list-item li.item a.grid .pirces .price1-2')
        images = self.driver.find_elements_by_css_selector('ul.list-item li.item a.grid>img')

        print('<CRAWLER> - %d PRODUCTS FOUND IN PAGE [%s]:' % (len(titles), page_url))

        for i in range(len(links)):
            try:
                price = int(prices[i].text.split(' ')[0].replace(',', ''))
            except:
                price = 0
            title = titles[i].text
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
