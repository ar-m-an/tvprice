def filter_brand(driver):
    elem = driver.find_element_by_xpath(
        "//table[1]/tbody/tr/td[text()[contains(. , 'برند')]]/following-sibling::td/div")

    return {'brand': elem.get_attribute('textContent')}


def filter_size(driver):
    elem = driver.find_element_by_xpath("//table[1]/tbody/tr/td[text()[contains(. ,'اندازه صفحه نمایش')]]/following-sibling::td/div")
    try:
        size = int(elem.get_attribute('textContent').split(' ')[0])
    except:
        size = 0
    return {'size': size}


def filter_port(driver):
    try:
        elem = driver.find_element_by_xpath(
            "//table/tbody/tr/td[text()[contains(.,'رابط هوشمند')]]/following-sibling::td/div")
        if elem.get_attribute('textContent') == 'دارد':
            return {'port': 'true'}
    except:
        pass

    return {'port': 'false'}


def filter_funcs():
    return [f for fname, f in sorted(globals().items()) if callable(f) and f.__name__ != 'filter_funcs']