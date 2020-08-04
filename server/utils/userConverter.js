function userConverter(dbUser){
    return {
        userId : dbUser.user_id,
        userEmail : dbUser.user_email,
        firstName : dbUser.first_name,
        lastName : dbUser.last_name,
        houseId : dbUser.house,
        house : dbUser.house_name,
        profile : dbUser.profile,
    }
}

module.exports = userConverter;