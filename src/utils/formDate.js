const formDate = (value) => {
  const now = new Date()
  const timeValue = new Date(value)
  const time = Math.floor((now.getTime() - timeValue.getTime()) / 1000)

  if (time < 60) return '방금 전'
  if (time < 3600) return `${Math.floor(time / 60)}분 전`
  if (time < 86400) return `${Math.floor(time / 3600)}시간 전`
  if (time < 31536000) return `${Math.floor(time / 86400)}일 전`
  return `${Math.floor(time / 31536000)}년 전`
}

export default formDate
