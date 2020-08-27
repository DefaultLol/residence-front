import * as yup from 'yup'

export default reviewSchema=yup.object({
    email:yup.string().required().min(6),
    password:yup.string().required().min(1),
    /*rating:yup.string().required().test('is-num','Rating must be between 1 and 5',(val)=>{
        return parseInt(val) < 6 && parseInt(val) > 0
    })*/
})