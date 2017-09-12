def filter_brand(driver):
    elem = driver.find_element_by_css_selector(
        '.info-header>h1>span'
    )
    brand = elem.text.split(' ')[0]
    return {'brand': brand}


def filter_size(driver):
    try:
        elem = driver.find_element_by_xpath(
            "//ul[@class='spec-list']/li/span[text()[contains(. ,'سايز صفحه')]]/following-sibling::span/span")
        size = int(elem.get_attribute('textContent').split(' ')[0].replace('\n', ''))
    except:
        size = 0
    return {'size': size}


def filter_port(driver):
    elem = driver.find_element_by_xpath(
        "//ul[@class='spec-list']/li/span[text()[contains(. ,'رابط هوشمند')]]/following-sibling::span")
    port = elem.get_attribute('data-mark')
    return {'port': port}


def filter_funcs():
    return [f for fname, f in sorted(globals().items()) if callable(f) and f.__name__ != 'filter_funcs']