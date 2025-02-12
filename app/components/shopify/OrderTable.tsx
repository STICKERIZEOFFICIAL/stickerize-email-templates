export function OrderTable({
  heading,
  hidePrices,
}: {
  heading: string;
  hidePrices?: boolean;
}) {
  return /*html*/ `
  <!-- Order table -->
  <tr>
    <td style="font-weight: bold; text-transform: uppercase; color:#000001; font-family:'Arial Black', Arial, sans-serif; text-align:left; font-size: 18px; line-height: 22px; padding-bottom: 10px; padding-left: 12px; padding-right: 12px;">
      ${heading}
    </td>
  </tr>
  <tr>
    <td style="padding: 0 16px 14px;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
        <!-- Item scenario 1 -->
        {% for line in subtotal_line_items %}
          {% if line.groups.size == 0 %}
            <tr class="order-list__item">
              <td class="order-list__item__cell">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    {% assign expand_bundles = false %}
                    {% assign thumb = line.properties._thumb %}

                    <!-- column left -->
                    <td class="mw-img-90" style="border-bottom: 1px solid #c8c7c4; font-size:0pt; line-height:0pt; text-align:left; padding-top: 24px; padding-bottom: 24px;" width="114" valign="top">
                        {% if thumb %}
                            <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                                <tr>
                                    <td style="border: 1px solid #c8c7c4; font-size:0pt; line-height:0pt; text-align:left; padding: 12px;">
                                        <img src="{{ thumb }}" align="left" width="88" height="88" class="order-list__product-image"/>
                                    </td>
                                </tr>
                            </table>
                        {% else %}
                            <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                                <tr>
                                    <td style="border: 1px solid #c8c7c4; font-size:0pt; line-height:0pt; text-align:left; padding: 12px;">
                                        <img src="{{ 'notifications/no-image.png' | shopify_asset_url }}" align="left" width="88" height="88" class="order-list__no-product-image"/>
                                    </td>
                                </tr>
                            </table>
                        {% endif %}
                    </td>
                    <!-- END column left -->

                    <td class="mw-10" style="border-bottom: 1px solid #c8c7c4; font-size:0pt; line-height:0pt; text-align:left; padding-top: 24px; padding-bottom: 24px;" width="24" valign="top">&nbsp;</td>
                    
                    <!-- column center -->
                    <td style="letter-spacing: -0.04em; border-bottom: 1px solid #c8c7c4; padding-top: 24px; padding-bottom: 24px; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px;" valign="top">
                      {% if line.product.title %}
                        {% assign line_title = line.product.title %}
                      {% else %}
                        {% assign line_title = line.title %}
                      {% endif %}

                      <!-- Product title -->
                      <p style=margin-bottom: 12px; padding-bottom: 12px; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px;">
                        <span class="order-list__item-title">{{ line_title }}</span>
                      </p>

                      <!-- List product details -->
                    <p style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px;">
                          {% assign important_properties = "Size,Quantity,_cut,_stkType" | split: "," %}
                          {% for prop_name in important_properties %}
                              {% for property in line.properties %}
                                  {% if property.first == prop_name and property.last != blank %}
                                      <span class="order-list__item-detail">•&nbsp;
                                      {% if property.first == "Quantity" %}
                                          {{ property.last }} PCS
                                      {% else %}
                                          {{ property.last }}
                                      {% endif %}
                                      </span><br/>
                                  {% endif %}
                              {% endfor %}
                          {% endfor %}

                          {% if line.selling_plan_allocation %}
                              <span class="order-list__item-detail">•&nbsp;{{ line.selling_plan_allocation.selling_plan.name }}</span><br/>
                          {% endif %}
                      </p>
                      {% if expand_bundles %}
                        {% for component in line.bundle_components %}
                          <table>
                            <tr class="order-list__item">
                              <td class="order-list__bundle-item">
                                <table>
                                  <td class="order-list__image-cell">
                                    {% if component.image %}
                                      <img src="{{ component | img_url: 'compact_cropped' }}" align="left" width="40" height="40" class="order-list__product-image small"/>
                                    {% else %}
                                      <div class="order-list__no-image-cell small">
                                        <img src="{{ 'notifications/no-image.png' | shopify_asset_url }}" align="left" width="40" height="40" class="order-list__no-product-image small"/>
                                      </div>
                                    {% endif %}
                                  </td>

                                  <td class="order-list__product-description-cell">
                                    {% if component.product.title %}
                                      {% assign component_title = component.product.title %}
                                    {% else %}
                                      {% assign component_title = component.title %}
                                    {% endif %}

                                    {% assign component_display = component.quantity %}

                                    <span class="order-list__item-title">{{ component_display }}&nbsp;&times;&nbsp;{{ component_title }}</span><br>

                                    {% if component.variant.title != 'Default Title'%}
                                      <span class="order-list__item-variant">{{ component.variant.title }}</span>
                                    {% endif %}
                                  </td>
                                </table>
                              </td>
                            </tr>
                          </table>
                        {% endfor %}
                      {% else %}
                        {% for group in line.groups %}
                          <span class="order-list__item-variant">Part of: {{ group.display_title }}</span><br/>
                        {% endfor %}
                      {% endif %}

                      {% if line.gift_card and line.properties["__shopify_send_gift_card_to_recipient"] %}
                        {% for property in line.properties %}
                          {% assign property_first_char = property.first | slice: 0 %}
                          {% if property.last != blank and property_first_char != '_' %}
                            <div class="order-list__item-property">
                              <dt>{{ property.first }}:</dt>
                              <dd>
                                {% if property.last contains '/uploads/' %}
                                  <a href="{{ property.last }}" class="link" target="_blank" style="color:#000001; text-decoration:none;">
                                    {{ property.last | split: '/' | last }}
                                  </a>
                                {% else %}
                                  {{ property.last }}
                                {% endif %}
                              </dd>
                            </div>
                          {% endif %}
                        {% endfor %}
                      {% endif %}

                      {% if line.selling_plan_allocation %}
                        <span class="order-list__item-variant">{{ line.selling_plan_allocation.selling_plan.name }}</span><br/>
                      {% endif %}

                      {% if line.refunded_quantity > 0 %}
                        <span class="order-list__item-refunded">Refunded</span>
                      {% endif %}

                      {% if line.discount_allocations %}
                        {% for discount_allocation in line.discount_allocations %}
                          {% if discount_allocation.discount_application.target_selection != 'all' %}
                            <p style="margin-top: 12px; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px;">
                              <span class="order-list__item-discount-allocation">
                                <img src="{{ 'notifications/discounttag.png' | shopify_asset_url }}" width="14" height="14" style="vertical-align: top;" class="discount-tag-icon" />
                                <span>
                                  {{ discount_allocation.discount_application.title | upcase }}
                                  (-{{ discount_allocation.amount | money_without_trailing_zeros }})
                                </span>
                              </span>
                            </p>
                          {% endif %}
                        {% endfor %}
                      {% endif %}												          
                    </td>
                    <!-- END column center -->

                    <td class="mw-10" style="border-bottom: 1px solid #c8c7c4; font-size:0pt; line-height:0pt; text-align:left; padding-top: 24px; padding-bottom: 24px;" width="24" valign="top">&nbsp;</td>

                    <!-- column right -->
                    ${
                      !hidePrices
                        ? /*html*/ `
                      {% if expand_bundles and line.bundle_parent? %}
                        <td style="border-bottom: 1px solid #c8c7c4; letter-spacing: -0.04em; padding-top: 24px; padding-bottom: 24px;" valign="top">
                      {% else %}
                        <td style="border-bottom: 1px solid #c8c7c4; letter-spacing: -0.04em; padding-top: 24px; padding-bottom: 24px;" valign="top">
                      {% endif %}
                        <p style="color:#000001; font-family:'Courier New', monospace; font-size: 13px; line-height: 17px; text-align:right;">
                          {% if line.final_line_price > 0 %}
                            {{ line.final_line_price | money_without_trailing_zeros }}
                            {% if line.unit_price_measurement %}
                              {{ line.unit_price | money_without_trailing_zeros }}/
                              {%- if line.unit_price_measurement.reference_value != 1 -%}
                                {{- line.unit_price_measurement.reference_value -}}
                              {%- endif -%}
                              {{ line.unit_price_measurement.reference_unit }}
                            {% endif %}
                          {% else %}
                            Free
                          {% endif %}
                        </p>
                        {% if line.original_line_price != line.final_line_price %}
                          <p class="c-grey l-grey" style="font-family:'Courier New', monospace; font-size: 13px; line-height: 17px; color:#c9c7c5; text-align:right;">{{ line.original_line_price | money_without_trailing_zeros }}</p>
                        {% endif %}
                      </td>`
                        : ""
                    }
                    <!-- END column right -->
                  </tr>
                </table>
              </td>
            </tr>
          {% endif %}
        {% endfor %}
        <!-- END Item scenario 1 -->											

        <!-- Item scenario 2 -->												
        {% for line_item_group in line_item_groups %}
          {% assign final_line_price = 0 %}
          {% assign original_line_price = 0 %}
          {% assign discount_keys_str = "" %}

          {% for component in line_item_group.components %}
            {% assign final_line_price = final_line_price | plus: component.final_line_price %}
            {% assign original_line_price = original_line_price | plus: component.original_line_price %}

            {% for da in component.discount_allocations %}
              {% if da.discount_application.target_selection != 'all' %}
                {% assign discount_key = da.discount_application.title | append: da.discount_application.type %}
                {% assign discount_keys_str = discount_keys_str | append: discount_key | append: "," %}
              {% endif %}
            {% endfor %}
          {% endfor %}

          {% assign discount_keys = discount_keys_str | split: "," | uniq %}
          <tr class="order-list__item">
            <td class="order-list__item__cell">
              <table>
                <td class="mw-img-90" style="border-bottom: 1px solid #c8c7c4; font-size:0pt; line-height:0pt; text-align:left; padding-top: 24px; padding-bottom: 24px;" width="114" valign="top">
                  {% if line_item_group.image %}
                    <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                      <tr>
                        <td style="border: 1px solid #c8c7c4; font-size:0pt; line-height:0pt; text-align:left;">
                          <img src="{{ line_item_group | img_url: 'compact_cropped' }}" align="left" width="112" height="112" class="order-list__product-image"/>
                        </td>
                      </tr>
                    </table>
                  {% else %}
                    <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                      <tr>
                        <td style="border: 1px solid #c8c7c4; font-size:0pt; line-height:0pt; text-align:left;">
                          <img src="{{ 'notifications/no-image.png' | shopify_asset_url }}" align="left" width="112" height="112" class="order-list__no-product-image"/>
                        </td>
                      </tr>
                    </table>
                  {% endif %}
                </td>
                <td class="mw-10" style="border-bottom: 1px solid #c8c7c4; font-size:0pt; line-height:0pt; text-align:left; padding-top: 24px; padding-bottom: 24px;" width="24" valign="top">&nbsp;</td>
                <td style="letter-spacing: -0.04em; border-bottom: 1px solid #c8c7c4; padding-top: 24px; padding-bottom: 24px; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px;" valign="top">
                  <!-- Product title -->
                  <p style="margin-bottom: 12px; padding-bottom: 12px; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px;">
                    <span class="order-list__item-title">{{ line_item_group.title }}&nbsp;&times;&nbsp;{{ line_item_group.quantity }}</span>
                  </p>

                  {% for discount_key in discount_keys %}
                    {% assign discount_amount = 0 %}
                    {% for component in line_item_group.components %}
                      {% for da in component.discount_allocations %}
                        {% assign key = da.discount_application.title | append: da.discount_application.type %}
                        {% if da.discount_application.target_selection != 'all' and key == discount_key %}
                          {% assign discount_amount = discount_amount | plus: da.amount %}
                          {% assign discount_title = da.discount_application.title %}
                        {% endif %}
                      {% endfor %}
                    {% endfor %}
                    <p>
                      <span class="order-list__item-discount-allocation">
                        <img src="{{ 'notifications/discounttag.png' | shopify_asset_url }}" width="14" height="14" style="vertical-align: top;" class="discount-tag-icon" />&nbsp;<span>{{ discount_title | upcase }} (-{{ discount_amount | money_without_trailing_zeros }})</span>
                      </span>
                    </p>
                  {% endfor %}

                  {% for component in line_item_group.components %}
                    <table>
                      <tr class="order-list__item">
                        <td class="order-list__bundle-item">
                          <table>
                            <td class="order-list__image-cell">
                              {% if component.image %}
                                <img src="{{ component | img_url: 'compact_cropped' }}" align="left" width="40" height="40" class="order-list__product-image"/>
                              {% else %}
                                <div class="order-list__no-image-cell small">
                                  <img src="{{ 'notifications/no-image.png' | shopify_asset_url }}" align="left" width="40" height="40" class="order-list__no-product-image small"/>
                                </div>
                              {% endif %}
                            </td>

                            <td class="order-list__product-description-cell">
                              <!-- Component title -->
                              {% if component.product.title %}
                                {% assign component_title = component.product.title %}
                              {% else %}
                                {% assign component_title = component.title %}
                              {% endif %}
                              <span class="order-list__item-title">{{ component.quantity }}&nbsp;&times;&nbsp;{{ component_title }}</span><br/>

                              <!-- Component variant -->
                              {% if component.variant.title != 'Default Title' %}
                                <span class="order-list__item-detail">&bull; {{ component.variant.title }}</span><br/>
                              {% endif %}

                              <!-- Component properties -->
                              {% for property in component.properties %}
                                {% assign property_first_char = property.first | slice: 0 %}
                                {% if property.last != blank and property_first_char != '_' %}
                                  <span class="order-list__item-detail">
                                    &bull; {{ property.first }}: {{ property.last }}
                                  </span><br/>
                                {% endif %}
                              {% endfor %}
                            </td>
                          </table>
                        </td>
                      </tr>
                    </table>
                  {% endfor %}
                </td>
                <td class="mw-10" style="border-bottom: 1px solid #c8c7c4; font-size:0pt; line-height:0pt; text-align:left; padding-top: 24px; padding-bottom: 24px;" width="24" valign="top">&nbsp;</td>
                ${
                  !hidePrices
                    ? /*html*/ `
                  <td style="border-bottom: 1px solid #c8c7c4; letter-spacing: -0.04em; padding-top: 24px; padding-bottom: 24px;" valign="top">
                    <p style="color:#000001; font-family:'Courier New', monospace; text-align:right; font-size: 13px; line-height: 17px;">
                      {% if final_line_price > 0 %}
                        {{ final_line_price | money_without_trailing_zeros }}
                      {% else %}
                        Free
                      {% endif %}
                    </p>
                    {% if original_line_price != final_line_price %}
                      <p class="c-grey l-grey" style="font-family:'Courier New', monospace; text-align:right; font-size: 13px; line-height: 17px; color:#c9c7c5;">{{ original_line_price | money_without_trailing_zeros }}</p>
                    {% endif %}
                  </td>
                `
                    : ""
                }
              </table>
            </td>
          </tr>
        {% endfor %}
        <!-- END Item scenario 2 -->												
      </table>
      <!-- END Item -->	
    </td>
  </tr>
  <!-- END Order table -->`;
}
