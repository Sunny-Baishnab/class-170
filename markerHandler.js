AFRAME.registerComponent('marker-handler',{
    init:async function(){
        var dishes = await this.getDishes()

        this.el.addEventListener('markerFound',()=>{
            var markerid = this.el.id
            this.handleMarkerFound(dishes,markerid)
        })

        this.el.addEventListener('markerLost',()=>{
            this.handleMarkerLost()
        })
    },

    handleMarkerFound:function(dishes,markerid){
        var buttonDiv = document.getElementById('buttonDiv')
        buttonDiv.style.display = 'flex'

        var orderButton = document.getElementById('orderButton')
        orderButton.addEventListener('click',()=>{
            swal({
                title:'Ordered Successfully',
                text:'Your order will be delivered shortly',
                icon:'success',
            })
        })

        var ratingButton = document.getElementById('ratingButton')
        ratingButton.addEventListener('click',()=>{
            swal({
                title:'Tell us How do you Feel',
                text:'Give Rating from 0 to 5',
                icon:'https://www.pikpng.com/pngl/b/193-1933847_png-file-svg-customer-rating-icon-clipart.png'
            })
        })
        var dish = dishes.filter(dish=>{
            dish.id === markerid
        })[0]
        var model = document.querySelector(`model-${dish.id}`)
        model.setAttribute('position',dish.model_geometry.position)
        model.setAttribute('rotation',dish.model_geometry.rotation)
        model.setAttribute('scale',dish.model_geometry.scale)
    },

    handleMarkerLost:function(){
        var buttonDiv = document.getElementById('buttonDiv')
        buttonDiv.style.display = 'none'
    },

    getDishes:async function(){
        return await firebase
        .firestore()
        .collection('dishes')
        .get()
        .then(snapshot=>{
            return snapshot.docs.map(doc=>{
                doc.data()
            })
        })
    }
})
