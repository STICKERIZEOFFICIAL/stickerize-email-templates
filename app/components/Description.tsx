export function Description({ description }: { description: string }) {
  return /*html*/ `
    <tr>
      <td style="text-transform: lowercase; color:#000001; font-family: 'Courier New', monospace; text-align:left; font-size: 13px; font-weight: 400; line-height: 17px; padding-bottom: 16px; padding-left: 16px; padding-right: 16px;">
        ${description}
      </td>
    </tr>
  `;
}
