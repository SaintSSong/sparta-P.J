import express from 'express';
import connect from './schemas/index.js';
import GoodsRouter from './routes/Goods.routes.js';


const app = express();
const PORT = 3000;

connect();

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Hi!' });
});

// 15번째 줄 const router = express.Router();와 똑같은 기능이 GoodsRouter.js에 또 있다.
app.use('/api', [router, GoodsRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});