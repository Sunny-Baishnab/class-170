AFRAME.registerComponent('marker-handler',{
    init:async function(){
        this.el.addEventListener('markerFound',()=>{
            this.handleMarkerFound()
        })

        this.el.addEventListener('markerLost',()=>{
            this.handleMarkerLost()
        })
    },

    handleMarkerFound:function(){
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
    },

    handleMarkerLost:function(){
        var buttonDiv = document.getElementById('buttonDiv')
        buttonDiv.style.display = 'none'
    }
})