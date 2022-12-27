const router=require('express').Router()
const studentRepo=require('./controller/student')

router.post('/createDb',studentRepo.createDB)
router.post('/add',studentRepo.add)
router.get('/findone/:dept_id',studentRepo.findOne)
router.get('/findall',studentRepo.findAll)
router.delete('/delete/:dept_id',studentRepo.deleteOne)
router.delete('/deletemany',studentRepo.deleteMany)
router.post('/addmany',studentRepo.addMany)
router.put('/updateone',studentRepo.updateOne)
router.put('/updatemany',studentRepo.updateMany)


module.exports=router