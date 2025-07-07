const deleteProduct = () => {
    document.querySelectorAll('.delete-button').forEach(btn => {
        btn.addEventListener('click' , () => {
            const productId = btn.dataset.productid;
            console.log(btn.parentNode.querySelector('[name=_csrf'))
            const csrf = btn.parentNode.querySelector('[name=_csrf]').value
            fetch('/admin/delete-product/' + productId , {
                method : "DELETE" ,
                headers : {
                    'csrf-token' : csrf
                }
            })
            .then(result => {
                document.querySelector(`.product-article-${productId}`).remove() ;
                return result.json()
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
}
deleteProduct()