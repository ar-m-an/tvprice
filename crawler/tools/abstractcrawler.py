from abc import ABCMeta
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

class AbstractCrawler(metaclass=ABCMeta):
    driver = None
    vendor = None

    def create_driver(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")

        # Disable loading images
        prefs = {"profile.managed_default_content_settings.images": 2}
        chrome_options.add_experimental_option("prefs", prefs)

        try:
            driver_path = './chromedriver.exe'
            driver = webdriver.Chrome(executable_path=driver_path, chrome_options=chrome_options)
        except:
            print('<CRAWLER> - UNABLE TO CREATE CHROME DRIVER.')
            return None

        print('<CRAWLER> - SELENIUM DRIVER STARTED SUCCESSFULLY.')
        return driver

    def get_pagination_urls(self):
        pass

    def get_product_listings(self, list_page):
        pass

    def get_single_product(self, product):
        pass
