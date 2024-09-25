export const itemsResponseDTO = (itemList) => {
    const responseArr = [];
    for (let i = 0; i < itemList.length; i++) {
        responseArr.push({
            itemId: itemList[i].item_id,
            name: itemList[i].name,
            price: itemList[i].price,
            image: itemList[i].image
        });
    }
    return {items: responseArr};
}

export const itemResponseDTO = (item) => {
    return {
        itemId: item.item_id,
        name: item.name,
        price: item.price,
        type: item.type,
        image: item.image
    };
}