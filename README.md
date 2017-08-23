# spgateway-js

智付通信用卡付款 API

`npm i --save spgateway-js`

## Usage

```js
var sp = require('spgateway-js')

var trade = sp.encrypt(KEY, IV, {
  MerchantID: SPGATEWAY_MERCHANT_ID,
  RespondType: 'JSON',
  TimeStamp: Math.floor(Date.now() / 1000),
  Version: '1.4',
  MerchantOrderNo: ORDER_NO,
  Amt: amount,
  ItemDesc: 'Item',
  Email: user.email,
  LoginType: 0,
  ReturnURL: '...',
  NotifyURL: '...
})
// trade = {TradeInfo: '...', TradeSha: '...'}

var payload = sp.decrypt(KEY, IV, TradeInfo)
```

## License

The MIT License