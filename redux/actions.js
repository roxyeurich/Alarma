export function ChangePage(page){
  return{
    type:"CHANGE_PAGE",
    page:page
  }
}

export function ChangeUserId(userid, group_id, admin, score, home){
  return{
    type:"CHANGE_USERID",
    userid:userid,
    group_id:group_id,
    admin:admin,
    score:score,
    home:home,
  }
}

export function ChangeAvatar(avatar){
  return{
    type:"CHANGE_AVATAR",
    avatar:avatar,
  }
}

export function ChangePasscode(group_name, passcode){
  return{
    type:"CHANGE_PASSCODE",
    group_name:group_name,
    passcode:passcode,
  }
}

export function ChangeLoad(loading){
  return{
    type:"CHANGE_LOAD",
    loading:loading,
  }
}