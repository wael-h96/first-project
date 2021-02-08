const PREFIX = "/api"

export const post = async (url, data) => {
    // console.log(data)
    try {
        const responeFromServer = await fetch(PREFIX + url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        return convert(responeFromServer)
    } catch (errors) {
        return errors;
    }
}

export const get = async (url) => {
    try {
        const responeFromServer = await fetch(PREFIX + url);
        return convert(responeFromServer)
    } catch (errors) {
        return errors;
    }
}


const convert = async response => {
    const result = await response.json();
    if (response.status === 200) {
        return { data: result };
    }
    return { errors: result.errors };
}
