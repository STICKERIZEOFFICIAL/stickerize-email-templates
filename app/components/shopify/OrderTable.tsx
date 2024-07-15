export function OrderTable({ heading, hidePrices }: { heading: string; hidePrices?: boolean }) {
  return /*html*/ `
  <!-- Order table -->
  <tr>
    <td  style="font-weight: bold; text-transform: uppercase; color:#000001; font-family:'neue-helvetica-73-extended', 'Arial Black', Arial, sans-serif; text-align:left; font-size: 18px; line-height: 22px; padding-left: 16px; padding-right: 16px;">
      ${heading}
    </td>
  </tr>
  <tr>
    <td style="padding: 0 16px 14px;">
      <!-- Item -->	
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        {% if subtotal_line_items %}
          {% assign products = subtotal_line_items %}
        {% else %}
          {% assign products = return.line_items %}
        {% endif %}
        {% for line in products %}
        <tr>
          <td class="mw-img-90" style="border-bottom: 2px solid #dedede; font-size:0pt; line-height:0pt; text-align:left; padding-top: 16px; padding-bottom: 16px;" width="105" valign="top">
            {% if line.image %}
              <img src="{{ line | img_url: 'compact_cropped' }}" width="105" height="auto" class="order-list__product-image" alt="" />
            {% endif %}
          </td>
          <td class="mw-10" width="16" style="border-bottom: 2px solid #dedede; font-size: 0pt; line-height: 0pt;">&nbsp;</td>


          <td style="padding: 16px 0; border-bottom: 2px solid #dedede;" valign="top">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td class="mfz-13 mlh-16" style="text-transform: uppercase; color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 4px;">
                    <span class="order-list__item-variant">{{ line.product.title }}</span><br/>
                </td>
              </tr>
              
              <tr>
                <td class="mfz-13 mlh-16" style="font-style: italic; color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 4px; text-transform: lowercase;">
                  {% for option in line.product.options %}
                    {% if option == 'Color' %}
                      {% assign colorOptionKey = 'option' | append: forloop.index %}
                    {% endif %}
                    {% if option == 'Formula' %}
                      {% assign formulaOptionKey = 'option' | append: forloop.index %}
                    {% endif %}
                    {% if option == 'Scent' %}
                      {% assign scentOptionKey = 'option' | append: forloop.index %}
                    {% endif %}
                  {% endfor %}


                  {% if line.product.metafields.custom.contents_title %}
                    <div style="padding-bottom: 4px;">
                      <i style="font-size: 0.8em; vertical-align: 0.15em; padding-right: 8px;">•</i>{{ line.product.metafields.custom.contents_title }}
                    </div>
                  {% endif %}
                  
                  {% if formulaOptionKey %}
                    <div style="padding-bottom: 4px;">
                      <i style="font-size: 0.8em; vertical-align: 0.15em; padding-right: 8px;">•</i>{{ line.variant[formulaOptionKey] }}
                    </div>
                  {% endif %}

                  {% if scentOptionKey %}
                    <div style="padding-bottom: 4px;">
                      <i style="font-size: 0.8em; vertical-align: 0.15em; padding-right: 8px;">•</i>{{ line.variant[scentOptionKey] }}
                    </div>
                  {% endif %}

                  <!--
                  {% if colorOptionKey %}
                    <div style="font-style: normal; padding-bottom: 4px;">
                      <i style="font-size: 0.8em; vertical-align: 0.15em; padding-right: 8px;">•</i>{{ line.variant[colorOptionKey] }}
                    </div>
                  {% endif %}
                  -->

                  <!-- Reset variables after usage -->
                  {% assign colorOptionKey = null %}
                  {% assign formulaOptionKey = null %}
                  {% assign scentOptionKey = null %}
                </td>
              </tr>
            </table>
          </td>
          ${
            !hidePrices
              ? /*html*/ `
                <td class="mfz-13 mlh-16" style="border-bottom: 2px solid #dedede; color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-top: 16px; padding-bottom: 16px; padding-left: 10px;" valign="top">
                  {% if line.original_line_price != line.final_line_price %}
                    <del class="order-list__item-original-price">{{ line.original_line_price | money_without_trailing_zeros }}</del>
                  {% endif %}
                  <p class="order-list__item-price">
                    {% if line.final_line_price > 0 %}
                      {{ line.final_line_price | money_without_trailing_zeros }}
                    {% else %}
                      Free
                    {% endif %}
                </td>`
              : ''
          }
        </tr>
        {% endfor %}
      </table>
      <!-- END Item -->	
    </td>
  </tr>
  <!-- END Order table -->`;
}
