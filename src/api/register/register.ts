/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-this-alias
const that: any = this
export function Register (username: string, password: string): boolean {
  that
    .axios({
      method: 'post',
      url: '/register',
      data: {
        username: username,
        password: password
      }
    })
    .then((res: any) => {
      if (res.status === 200) {
        console.log(res) // 设置token
      }
    })
    .catch((err: any) => {
      console.log(JSON.stringify(err)) // 报错
    })
  return true
}
