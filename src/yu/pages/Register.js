import '../styles/members-register.scss'
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

function Register(props) {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
    email: '',
    mobile: '',
    address: '',
    birthday: '',
    password: '',
    password2: '',
  })
  // 切換開始作檢查的旗標
  const [startToChecked, setStartToChecked] = useState(false)
  // 錯誤陣列，記錄有錯誤的欄位名稱
  const [errors, setErrors] = useState([])

  const onChangeForField = (fieldName) => (event) => {
    setInputs((state) => ({ ...state, [fieldName]: event.target.value }))
  }

  // const [name, setName] = useState('')
  // const [nickname, setNickname] = useState('')
  // const [email, setEmail] = useState('')
  // const [mobile, setMobile] = useState('')
  // const [address, setAddress] = useState('')
  // const [birthday, setBirthday] = useState('')
  // const [password, setPassword] = useState('')
  // const [password2, setPassword2] = useState('')

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  // 按了提交按鈕用的
  const handleSubmit = (e) => {
    //開啟開始觸發檢查的旗標
    setStartToChecked(true)

    //檢查帳號
    const newErrors = []
    if (inputs.name.trim().length < 1) {
      newErrors.push('name')
    }

    //檢查email(要有@)
    const re = /\S+@\S+\.\S+/
    if (!re.test(inputs.email.toLowerCase())) {
      newErrors.push('email')
    }

    //檢查密碼(6-24位英數字)
    const password = /[A-Za-z0-9]{6,24}/
    if (!password.test(inputs.password.toLowerCase())) {
      newErrors.push('password')
    }

    //檢查手機格式
    const mobile = /09\d{2}-?\d{3}-?\d{3}/
    if (!mobile.test(inputs.mobile)) {
      newErrors.push('mobile')
    }

    if (inputs.password !== inputs.password2) {
      newErrors.push('passworddifference')
    }

    setErrors(newErrors)
  }

  // 切換合法不合法的css與提示字詞
  const fieldValidCSS = (fieldName) => {
    if (!startToChecked) return ''

    return errors.includes(fieldName) ? 'is-invalid' : ''
  }

  const register = async function () {
    const url = 'http://localhost:3333/member/register'
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        name: inputs.name,
        nickname: inputs.nickname,
        email: inputs.email,
        mobile: inputs.mobile,
        address: inputs.address,
        birthday: inputs.birthday,
        password: inputs.password,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log(data)

    if (data.success) {
      localStorage.setItem('userLogin', JSON.stringify(data))
      localStorage.setItem('userId', JSON.stringify(data.body.sid))
      console.log(JSON.parse(localStorage.getItem('userLogin')))
      setShow(true)
      toMenu()
    } else {
      localStorage.removeItem('userLogin')
      localStorage.removeItem('userId')
    }
  }

  function toMenu() {
    window.setTimeout(() => (window.location.href = '/menu'), 2000)
  }

  return (
    <>
      <div className="container my-5">
        {/* <!-- 紅圓點 --> */}
        <div className="yu-register-redpoint"></div>
        <form>
          {/* <!-- 比例 --> */}
          <div className="form-width-height yu-register-form">
            {/* <!-- 表單標題 --> */}
            <div className="form-tittle yu-register-form-title">
              <h5>新會員註冊</h5>
            </div>
            {/* <!-- 背景圖 --> */}
            <div className="yu-register-bookspage">
              <img
                className="yu-register-bookspage1-1"
                src="http://localhost:3000/images/yu/book-register.jpg"
                alt=""
              />
            </div>
            {/* <!-- 姓名input --> */}
            <div className="form-group">
              <div className="formItems row d-flex justify-content-center">
                <label className="inputText col-1" htmlFor="inputName">
                  姓名
                </label>
                <input
                  type="text"
                  className={`formInput col-4 form-control ${fieldValidCSS(
                    'name'
                  )} `}
                  id="inputName"
                  name="name"
                  placeholder="必填"
                  onChange={onChangeForField('name')}
                  required
                />
                {/* <div class="valid-feedback"></div> */}
                <div class="invalid-feedback">姓名要記得填哦</div>
              </div>
            </div>
            {/* <!-- 暱稱input --> */}
            <div className="form-group">
              <div className="formItems row d-flex justify-content-center">
                <label className="inputText col-1" htmlFor="inputName">
                  暱稱
                </label>
                <input
                  type="text"
                  className={`formInput col-4 form-control`}
                  id="inputName"
                  name="nickname"
                  placeholder=""
                  onChange={onChangeForField('nickname')}
                />
              </div>
            </div>
            {/* <!-- 信箱input --> */}
            <div className="form-group">
              <div className="formItems row d-flex justify-content-center">
                <label className="inputText col-1" htmlFor="inputEmail">
                  電子信箱
                </label>
                <input
                  type="email"
                  name="email"
                  id="inputEmail"
                  className={`formInput col-4 form-control ${fieldValidCSS(
                    'email'
                  )} `}
                  placeholder="honkibooks@mail.com"
                  onChange={onChangeForField('email')}
                  required
                />
                {/* <div class="valid-feedback">email正確</div> */}
                <div class="invalid-feedback">email格式錯囉</div>
              </div>
            </div>
            {/* <!-- 手機input --> */}
            <div className="form-group">
              <div className="formItems row d-flex justify-content-center">
                <label className="inputText col-1" htmlFor="inputMobile">
                  手機
                </label>
                <input
                  type="text"
                  className={`formInput col-4 form-control ${fieldValidCSS(
                    'mobile'
                  )} `}
                  placeholder="請輸入09xx-xxx-xxx"
                  id="inputMobile"
                  name="mobile"
                  onChange={onChangeForField('mobile')}
                />
              </div>
            </div>
            {/* <!-- 地址input --> */}
            <div className="form-group">
              <div className="formItems row d-flex justify-content-center">
                <label className="inputText col-1" htmlFor="inputAddress">
                  地址
                </label>
                <input
                  className={`formInput col-4 form-control`}
                  id="inputName"
                  name="address"
                  placeholder=""
                  rows="1"
                  onChange={onChangeForField('address')}
                />
              </div>
            </div>
            {/* <!-- 生日input --> */}
            <div className="form-group">
              <div className="formItems row d-flex justify-content-center">
                <label className="inputText col-1" htmlFor="inputBirthday">
                  生日
                </label>
                <input
                  type="date"
                  className={`formInput col-4 form-control`}
                  id="inputBirthday"
                  name="birthday"
                  onChange={onChangeForField('birthday')}
                />
              </div>
            </div>

            {/* <!-- 密碼input--> */}
            <div className="form-group">
              <div className="formItems row d-flex justify-content-center">
                <label className="inputText col-1" htmlFor="inputPassword">
                  密碼
                </label>
                <input
                  type="password"
                  name="password"
                  className={`formInput col-4 form-control ${fieldValidCSS(
                    'password'
                  )} `}
                  id="inputPasswordConfirm"
                  onChange={onChangeForField('password')}
                  required
                  minLength="6"
                />
                {/* 提示語 */}
                {/* <div class="valid-feedback">密碼ok</div> */}
                <div class="invalid-feedback">密碼長度請大於6位數</div>
              </div>
            </div>
            {/* <!-- 密碼確認input--> */}
            <div className="form-group">
              <div className="formItems row d-flex justify-content-center">
                <label
                  className="inputText col-1"
                  htmlFor="inputPasswordConfirm"
                >
                  確認密碼
                </label>
                <input
                  type="password"
                  name="password2"
                  className={`formInput col-4 form-control ${fieldValidCSS(
                    'passworddifference'
                  )} `}
                  id="inputPasswordConfirm"
                  onChange={onChangeForField('password2')}
                  required
                  minLength="6"
                />
                {/* 提示語 */}
                {/* <div class="valid-feedback">密碼ok</div> */}
                <div class="invalid-feedback">密碼不一樣</div>
              </div>
            </div>
            {/* <!-- checkbox --> */}
            <div className="form-group form-check d-flex justify-content-center">
              <div>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="yu-saveaccountandpassword"
                />
                <label
                  className="form-check-label yu-register-save"
                  for="yu-saveaccountandpassword"
                >
                  <p>我接受服務條款及隱私政策</p>
                </label>
              </div>
            </div>
            {/* <!-- 按鈕 --> */}
            <div className="form-group button-group">
              <div className="formItems row d-flex justify-content-center">
                <div className="yu-register-send">
                  <Button
                    className="btn-md-dark form-button form-control"
                    onClick={() => {
                      handleSubmit()
                      register(
                        inputs.name,
                        inputs.nickname,
                        inputs.email,
                        inputs.mobile,
                        inputs.address,
                        inputs.birthday,
                        inputs.password
                      )
                    }}
                  >
                    送出
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Honki</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>註冊成功，歡迎你加入我們!</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        關閉
                      </Button>
                      {/* <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button> */}
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
