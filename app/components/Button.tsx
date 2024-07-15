export function Button({ url, label, paddingTop = 24 }: { url: string; label: string; paddingTop?: 0 | 24 }) {
  return /*html*/ `
  <!-- Button -->
  <tr>
    <td style="padding: ${paddingTop}px 16px 32px;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#000001">
        <tr>
          <td class="btn l-white"
            style="font-weight: bold; text-transform: uppercase; font-family:'neue-helvetica-73-extended', 'Arial Black', Arial, sans-serif; text-align:center; mso-padding-alt:21px 20px; font-size: 18px; line-height: 22px; color:#fffffe;">
            <a href="${url}" target="_blank" class="link"
              style="font-weight: bold; font-family:'neue-helvetica-73-extended', 'Arial Black', Arial, sans-serif; display: block; padding: 21px 20px; text-decoration:none; color:#fffffe;">
              ${label}
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- END Button -->`;
}
