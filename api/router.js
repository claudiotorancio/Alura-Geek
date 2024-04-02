import {Router} from 'express'
import signin from "../backend/routes/user/signin.js";
import signup from "../backend/routes/user/signup.js";
import logout from "../backend/routes/user/logout.js";
import renderProducts from "../backend/routes/Prduct/renderProducts.js";
import createProduct from "../backend/routes/Prduct/createProduct.js";
import deleteProduct from "../backend/routes/Prduct/deleteProduct.js";
import detailsProduct from "../backend/routes/Prduct/detailsProduct.js";
import updateProduct from "../backend/routes/Prduct/updateProduct.js";


const router = Router()

router.post('/api/signup', signup);
router.post('/api/signin', signin);
router.delete('/api/logout', logout)
router.get('/api/renderProducts', renderProducts);
router.post('/api/createProduct', createProduct);
router.delete('/api/deleteProduct/:id', deleteProduct);
router.get('/api/detailsProduct/:id', detailsProduct);
router.put('/api/updateProduct/:id',  updateProduct);

export default router