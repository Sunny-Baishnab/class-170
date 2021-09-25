AFRAME.registerComponent('create-markers',{
    init:async function(){
        var mainScene = document.querySelector('#scene')
        var dishes = await this.getDishes()
        dishes.map(dish=>{
            var marker = document.createElement('a-marker')
            marker.setAttribute('type','pattern')
            marker.setAttribute('id',dish.id)
            marker.setAttribute('url',dish.marker_pattern_url)
            marker.setAttribute('cursor',{
                rayOrigin:'mouse'
            })
            marker.setAttribute('marker-handler',{})
            mainScene.appendChild(marker)

            var model = document.createElement('a-entity')
            model.setAttribute('id',`model-${dish.id}`)
            model.setAttribute('position',dish.model_geometry.position)
            model.setAttribute('rotation',dish.model_geometry.rotation)
            model.setAttribute('scale',dish.model_geometry.scale)
            model.setAttribute('gltf-model',`url(${dish.model_url})`)
            model.setAttribute('gesture-handler',{})

            marker.appendChild(model)

            var mainPlane = document.createElement('a-plane')
            mainPlane.setAttribute('id',`main-plane-${dish.id}`)
            mainPlane.setAttribute('position',{x:0,y:0,z:0})
            mainPlane.setAttribute('rotation',{x:-90,y:0,z:0})
            mainPlane.setAttribute('width',1.7)
            mainPlane.setAttribute('height',1.5)

            marker.appendChild(mainPlane)

            var titlePlane = document.createElement('a-plane')
            titlePlane.setAttribute('id',`title-plane-${dish.id}`)
            titlePlane.setAttribute('position',{x:0,y:0.89,z:0.02})
            titlePlane.setAttribute('rotation',{x:0,y:0,z:0})
            titlePlane.setAttribute('width',1.69)
            titlePlane.setAttribute('height',0.3)
            titlePlane.setAttribute('material',{color:'yellow'})
            mainPlane.appendChild(titlePlane)

            var dishtitle = createElement('a-entity')
            dishtitle.setAttribute('id',`dish-title-${dish.id}`)
            dishtitle.setAttribute('position',{x:0.3,y:0,z:0.1})
            dishtitle.setAttribute('rotation',{x:0,y:0,z:0})
            dishtitle.setAttribute('text',{
                font:'monoid',
                value:dish.dish_name.toUpperCase(), 
                color:'black', 
                width:1.8, 
                height:1, 
                align:'center'
            })
            titlePlane.appendChild(dishtitle)

            var ingredients = createElement('a-entity')
            ingredients.setAttribute('id',`ingredients-${dish.id}`)
            ingredients.setAttribute('position',{x:0.3,y:0,z:0.1})
            ingredients.setAttribute('rotation',{x:0,y:0,z:0})
            ingredients.setAttribute('text',{
                font:'monoid',
                value:`${dish.Ingredients.join('\n\n')}`, 
                color:'black', 
                width:2,  
                align:'left'
            })
            mainPlane.appendChild(ingredients)
        })
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