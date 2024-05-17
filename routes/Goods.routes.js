import express from 'express';
import Goods from '../schemas/goods.schemas.js';


// 이것으로 인해서 router를 생성할 수 있게 된다.
const router = express.Router();

//* 현재 상품 등록 api와 상품 목록 조회api는 작성 완료하여 insomnia를 통해 구동이 되는 것을 확인했습니다. */
//* 다만 상품 업데이트 및 삭제 기능은 구현하지 못했습니다.
//* aws ec2 등 배포는 아직 모릅니다.

// 상품 등록 API
router.post('/goods', async(req, res)=> {
    // 클라이언트가 서버에 데이터를 보냈는데 
    // 1. 클라이언트한테 데이터 받기
    const {name, description, manager, password} = req.body;

    // console.log(name, description, manager, password);

    // 2. 받은 데이터를 가지고 데이터베이스에 등록하기
    const PostGoods = new Goods({name, description, manager, password});
    // await는 서버로 등록하는데 오래 걸리는 작업들이 많다. 
    // 그때 완료되가 되지 않고 다음 코드로 넘어가서 실행되는 것을 
    // 방지하기 위해서 작성하는 코드다. 말 그대로 ""wait"!! 이다.
    await PostGoods.save();

    // 3. 클라이언트한테 적절한 응답 주기(상품등록완료 메세지 or 등록된 상품 데이터 보내기)
    return res.status(201).json({PostGoods: PostGoods});
})

// 상품 목록 조회 API
router.get('/goods', async(req, res)=> {
    // 1. 상품 목록 조회를 진행한다.
    // find()는 전체 목록 조회, sort는 정렬 기능, 
    const goods = await Goods.find().sort('-createdAt').exec();

    return res.status(200).json({goods})
})


// 상품 삭제 API
router.delete('/goods/:goodsId', async(req, res)=> {
    // 1.상품 ID를 Path Parameter(req.params)로 전달 받습니다.
    const {goodsId} = req.params;
    // 2. 비밀번호를 Request body(req.body)로 전달 받습니다.
    const {pw} = req.body;
    // 아이디값(todoId)을 받아 왔으니 '해야할 일'을 찾아야한다.
    const goods = await Goods.findById(goodsId).exec();

    if(!goods) {
        return res.status(404).json({errerMessage: "비밀번호가 일치하지않습니다."})
    }

    await Goods.deleteOne({ _id: goodsId});

    return res.status(200).json({});
})





export default router;