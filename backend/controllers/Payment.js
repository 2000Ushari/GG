import crypto from 'node:crypto';

const merchant_id = '1228561';
const merchant_secret = 'NDI0MDI0NTAxMjEyNDkzNTI5NDg0MDUxMzYwNTI0MzM5NzEyNjQxNw==';

export const getHash = async (req, res) => {
  const { order_id, amount, currency } = req.body;
  console.log(order_id, amount, currency);

  const hash = crypto
    .createHash('md5')
    .update(
      merchant_id +
        order_id +
        amount +
        currency +
        crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase()
    )
    .digest('hex')
    .toUpperCase();

  console.log('Payment hash generated: ' + hash);

  res.status(200).json({ hash, merchant_id });
};

export default getHash;
