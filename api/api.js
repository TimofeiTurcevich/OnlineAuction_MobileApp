import axios, { Axios } from "axios";
import { Platform } from "react-native";

const getAllLotsUrl = "http://192.168.0.123:8082/lots"
const getAllTagsUrl = "http://192.168.0.123:8082/tags"
const getSubTagsUrl = "http://192.168.0.123:8082/tags/subTags"
const getLotDetailsUrl = "http://192.168.0.123:8082/lots/byId"
const getFavoriteLotsUrl = "http://192.168.0.123:8082/lots/favorite"
const getLotsHistoryUrl = "http://192.168.0.123:8082/lots/lotsHistory"
const getProfileInfoUrl = "http://192.168.0.123:8082/user"
const getLotsByUserIdUrl = "http://192.168.0.123:8082/lots/userLots"
const getLotsByTagUrl = "http://192.168.0.123:8082/lots/byTag"
const getLotsBySubTagUrl = "http://192.168.0.123:8082/lots/bySubTag"
const getChatsUrl = "http://192.168.0.123:8082/chats"
const getDialogUrl = "http://192.168.0.123:8082/chats/dialog"
const checkIfInFavoriteUrl = "http://192.168.0.123:8082/lots/favorite/check"
const getDialogIdUrl = "http://192.168.0.123:8082/chats/getDialogId"
const getAllSubTagsUrl = "http://192.168.0.123:8082/tags/allSubTags"


const loginUrl = "http://192.168.0.123:8082/auth/login"
const getUserIdUrl = "http://192.168.0.123:8082/user/userId"


const addToFavoriteUrl = "http://192.168.0.123:8082/lots/addToFavorite"
const placeABetUrl = "http://192.168.0.123:8082/lots/placeABet"
const sendAMessageUrl = "http://192.168.0.123:8082/chats/sendMessage"
const createLotUrl = "http://192.168.0.123:8082/lots/createLot"
const registerUrl = "http://192.168.0.123:8082/auth/registration"
const updateProfileUrl = "http://192.168.0.123:8082/user/update"



const removeFromFavoriteUrl = "http://192.168.0.123:8082/lots/removeFromFavorite"
const deleteProfileUrl = "http://192.168.0.123:8082/user/delete"
const deleteLotUrl = "http://192.168.0.123:8082/lots"



export const getAllLots = async (sortBy, title, page) => {
    return (await axios.get(getAllLotsUrl, {
        params: {
            sortBy: sortBy.value,
            title: title,
            size: 4,
            page: page
        }
    })).data
}

export const getFavoriteLots = async (sortBy, title, page, token, userId) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    return (await axios.get(getFavoriteLotsUrl, {
        headers: headers,
        params: {
            id: userId,
            sortBy: sortBy.value,
            title: title,
            size: 4,
            page: page
        }
    })).data
}

export const checkIfInFavorite = async (userId, lotId, token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    return (await axios.get(checkIfInFavoriteUrl, {
        headers: headers,
        params: {
            lotId: lotId,
            userId: userId
        }
    })).data
}

export const getLotsByTag = async (sortBy, title, page, token, userId, tag) => {
    if (tag.tag) {
        return (await axios.get(getLotsBySubTagUrl, {
            params: {
                id: tag.id,
                sortBy: sortBy.value,
                title: title,
                size: 4,
                page: page
            }
        })).data
    }
    return (await axios.get(getLotsByTagUrl, {
        params: {
            id: tag.id,
            sortBy: sortBy.value,
            title: title,
            size: 4,
            page: page
        }
    })).data
}

export const getAllTags = async () => {
    return (await axios.get(getAllTagsUrl)).data
}

export const getSubTags = async (tagId) => {
    return (
        await axios.get(getSubTagsUrl, {
            params: {
                tagId: tagId
            }
        }
        )
    ).data;
}

export const getAllSubTags = async () => {
    return (await axios.get(getAllSubTagsUrl)).data
}

export const getLotsByUserId = async (sortBy, title, page, token, userId) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    return (await axios.get(getLotsByUserIdUrl, {
        headers: headers,
        params: {
            id: userId,
            sortBy: sortBy.value,
            title: title,
            size: 4,
            page: page
        }
    })).data
}

export const getLotsHistory = async (sortBy, title, page, token, userId) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    return (await axios.get(getLotsHistoryUrl, {
        headers: headers,
        params: {
            id: userId,
            sortBy: sortBy.value,
            title: title,
            size: 4,
            page: page
        }
    })).data
}

export const getLotDetails = async (lotId, token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    return (await axios.get(getLotDetailsUrl, {
        headers: headers,
        params: {
            id: lotId
        }
    })).data
}

export const getProfileInfo = async (userId, token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    return (await axios.get(getProfileInfoUrl, {
        headers: headers,
        params: {
            id: userId
        }
    })).data
}

export const getChats = async (userId, token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    return (await axios.get(getChatsUrl, {
        headers: headers,
        params: {
            id: userId
        }
    })).data
}

export const getDialog = async (dialogId, token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    return (await axios.get(getDialogUrl, {
        headers: headers,
        params: {
            id: dialogId
        }
    })).data
}

export const getDialogId = async (userId, lotId, token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    return (await axios.get(getDialogIdUrl, {
        headers: headers,
        params: {
            userId: userId,
            lotId: lotId
        }
    })).data
}


export const addToFavorite = async (userId, lotId, token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    const data = {
        firstId: userId,
        secondId: lotId
    }
    return (await axios.post(addToFavoriteUrl, data, {
        headers: headers
    })).data
}

export const removeFromFavorite = async (userId, lotId, token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    return (await axios.delete(removeFromFavoriteUrl, {
        headers: headers,
        params: {
            userId: userId,
            lotId: lotId
        }
    })).data
}

export const placeABet = async (userId, lotId, bet, token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    const data = {
        userId: userId,
        lotId: lotId,
        bet: bet
    }
    return (await axios.post(placeABetUrl, data, {
        headers: headers
    })).data
}

export const sendAMessage = async (userId, message, chatId, token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    let date = new Date()
    const formatOptions = {
        timeZone: 'Asia/Jakarta',
        dateStyle: 'short',
        hour12: false,
        timeStyle: 'medium'
    };
    date = new Intl.DateTimeFormat('en-CA', formatOptions).format(date).split(',').join('').substring(0, 10) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    const data = {
        message: message,
        sendDate: date,
        senderId: userId,
        chatId: chatId
    }
    return (await axios.post(sendAMessageUrl, data, {
        headers: headers
    })).data
}

export const createLot = async (title, startPrice, endDate, sellerId, description, tags, images, token) => {
    let date = endDate
    const formatOptions = {
        timeZone: 'Asia/Jakarta',
        dateStyle: 'short',
        hour12: false,
        timeStyle: 'medium'
    };
    date = new Intl.DateTimeFormat('en-CA', formatOptions).format(date).split(',').join('').substring(0, 10) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    const data = {
        title: title,
        endDate: date,
        startPrice: startPrice,
        description: description,
        seller: { id: sellerId },
        tags: tags
    }

    const formData = new FormData()
    images.forEach(i => {
        formData.append('images', {
            uri: i.name,
            type: 'image/jpeg',
            name: i.name.substring(i.name.lastIndexOf("/") + 1)
        })
    });

    formData.append('lot', JSON.stringify(data))

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': "Bearer " + token
    }

    return (await axios.post(createLotUrl, formData, {
        headers: headers
    })).data
}

export const registration = async (nickname, firstName, lastName, dateOfBirth, password, image) => {
    let date = dateOfBirth
    const formatOptions = {
        timeZone: 'Asia/Jakarta',
        dateStyle: 'short',
        hour12: false,
        timeStyle: 'medium'
    };
    date = new Intl.DateTimeFormat('en-CA', formatOptions).format(date).split(',').join('').substring(0, 10)

    const formData = new FormData()
    formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: image.substring(image.lastIndexOf("/") + 1)
    })
    const data = {
        nickname: nickname,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: date,
        password: password
    }
    formData.append('user', JSON.stringify(data))


    const headers = {
        'Content-Type': 'multipart/form-data'
    }

    axios.post(registerUrl, formData, {
        headers: headers
    })

}


export const updateProfile = async (userId, firstName, lastName, oldPass, newPass, birthDate, token) => {
    let date = birthDate
    const formatOptions = {
        timeZone: 'Asia/Jakarta',
        dateStyle: 'short',
        hour12: false,
        timeStyle: 'medium'
    };
    date = new Intl.DateTimeFormat('en-CA', formatOptions).format(date).split(',').join('').substring(0, 10)

    const headers = {
        'Authorization': "Bearer " + token
    }

    const data = {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        oldPass: oldPass,
        newPass: newPass,
        birthDate: date
    }

    return (await axios.patch(updateProfileUrl, data, {
        headers: headers
    })).data
}

export const deleteProfile = async (userId, token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    return (await axios.delete(deleteProfileUrl, {
        headers: headers,
        params: {
            id: userId
        }
    })).data
}

export const deleteLot = async (lotId, token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    return (await axios.delete(deleteLotUrl, {
        headers: headers,
        params: {
            id: lotId
        }
    })).data
}


export const login = async (login, password) => {
    console.log(login)
    const data = {
        login: login,
        password: password
    }
    return (await axios.post(loginUrl, data)).data
}

export const getUserId = async (token) => {
    const headers = {
        'Authorization': "Bearer " + token
    };

    console.log(token)

    return (await axios.get(getUserIdUrl, {
        headers: headers
    })).data
}