def filter_brand(driver):
    elem = driver.find_element_by_css_selector(
        '#product-description-area h2[itemprop="model"] span:last-child'
    )
    brand = elem.text.split(' ')[0]
    return {'brand': brand}


def filter_size(driver):
    elem = driver.find_element_by_css_selector(
        "#productVariationForm div.product-variation:nth-child(5) .cur-variation")
    try:
        size = int(elem.text.split(' ')[0])
    except:
        size = 0;
    return {'size': size}


def filter_port(driver):
    elem = driver.find_element_by_xpath(
        "//tr/td[text()[contains(. ,'سایر امکانات')]]/following-sibling::span")
    if 'رابط هوشمند' in elem.text:
        return 'port', 'true'
    return {'port': 'false'}


def filter_funcs():
    return [f for fname, f in sorted(globals().items()) if callable(f) and f.__name__ != 'filter_funcs']