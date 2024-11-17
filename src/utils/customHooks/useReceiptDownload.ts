import { Alert, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment';

import { requestStoragePermissions } from '../Permissions';
import { showFadeAlert } from '../Alert';

export function useReceiptDownload(orderData: any) {
  const htmlContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Receipt</title>
    <style>
      body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }

    .container {
      padding: 16px;
      max-width: 480px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .top-heading {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      margin: 16px 0 0 0;
    }

    .top-sub-heading {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
    }

    .order-box {
      margin-top: 16px;
      padding: 16px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .line {
      border-top: 1px solid #e6e6e6;
      margin: 12px 0;
    }

    .order-items .item {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin-top: 10px;
    }

    .order-amount .row {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin: 4px 0;
    }

    .total {
      font-weight: bold;
      color: #007bff;
    }

    .qty-text {
      text-align: right;
      font-size: 12px;
      margin-top: 10px;
    }

    .variant-main {
      display: flex;
      flex-direction: row;
      gap: 5px;
      margin-left: 5px;
      flex-wrap: wrap;
      margin-top: 5px;
    }

    .variant-sub {
      display: flex;
      flex-direction: row;
      gap: 5px;
      width: 100%;
    }

    .variant-name {
      font-size: 12px;
      text-transform: capitalize;
      color: #271919;
      flex-direction: row;
      display: flex;
    }

    .atrribute-name {
      font-size: 11px;
      text-transform: capitalize;
      color: #271919;
    }
    </style>
</head>
<body>
  <div class="container">
        <h1 class="top-heading">Order Receipt</h1>
        <h3 class="top-sub-heading">#${orderData?.orderId}</h3>
        <div class="order-box">
          <div class="order-items">
            ${orderData?.orderItems && orderData?.orderItems?.length > 0
      ? orderData?.orderItems
        .map(
          (item: { qty: any; itemName: any; variants: any[]; price: any; }) => `
                <div class="item">
                  <span>
                    • ${item?.qty} x ${item?.itemName}
                    <div class="variant-main">
                      ${item?.variants?.map((k) =>
            `<div class="variant-sub">
                          <span>-</span>
                          <span class="variant-name">
                            <span> ${k?.name}: </span> 
                            <div>
                              <span class="atrribute-name">
                              ${k?.variantAttributes?.map((attr: { name: string; }) => attr.name)
              .join(', ')}
                                </span>
                            </div>
                          </span>
                         </div>`
          ).join("")}
                    </div>
                    </span>
                  <span>$${item.price}</span>
                </div>`
        )
        .join("")
      : "No items ordered"
    }
            <p class="qty-text">Qty: ${orderData.totalQty}</p>
          </div>
          <hr class="line">
          <div class="order-amount">
            <div class="row">
              <span>Item:</span>
              <span>$${orderData.itemTotal}</span>
            </div>
            <div class="row">
              <span>Extra Add On:</span>
              <span>$${orderData.variantTotalPrice}</span>
            </div>
            <div class="row">
              <span>Postage & Packing:</span>
              <span>$${orderData.packagingCost}</span>
            </div>
            <div class="row">
              <span>Total Before Tax:</span>
              <span>$${orderData.totalWithOutTax}</span>
            </div>
            <div class="row">
              <span>Tax:</span>
              <span>$${orderData.taxAmount}</span>
            </div>
            <hr class="line">
            <div class="row total">
              <span>Total:</span>
              <span>$${orderData.finalAmount}</span>
            </div>
          </div>
        </div>
      </div>
</body>
</html>
`;

  const moveToExternalStorage = async (sourcePath: string, fileName: string) => {
    try {
      const destinationPath = `${RNFS.ExternalStorageDirectoryPath}/Download/${fileName}.pdf`;
      await RNFS.copyFile(sourcePath, destinationPath);
      return destinationPath;
    } catch (error) {
      console.error('Error moving file:', error);
    }
  };

  const createPDF = async () => {
    try {
      const granted = await requestStoragePermissions();

      if (!granted) {
        showFadeAlert('Permissions not granted!');
        return;
      }

      let PDFOptions = {
        html: htmlContent,
        fileName: `receipt-${orderData?.orderId}`,
        directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;

      if (Platform.OS === 'android') {
        // Move file to external storage (e.g., Downloads)
        const filePath = await moveToExternalStorage(file.filePath, PDFOptions.fileName);
        Alert.alert('Receipt file path', filePath);
      } else {
        Alert.alert('Receipt file path', file.filePath);
      }
    } catch (error: any) {
      console.log('Failed to generate pdf: ', error.message);
    }
  };

  return { createPDF };
}