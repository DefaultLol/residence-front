import * as yup from 'yup'

export default reviewSchema=yup.object({
    firstName:yup.string().required().min(4),
    lastName:yup.string().required().min(4),
    email:yup.string().required().min(1),
    phone:yup.number().required(),
    appart_number:yup.number().required(),
    parking_number:yup.number().required(),
    password:yup.string().required().min(5),
    confirmPass: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})