<template>
   <v-card>
     <div>
              <v-card-title>
                  <v-text-field
                    v-model="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
               <v-data-table
                    :headers="header"
                    :items="muster"
                    :search="search"
                    item-key="slot"
                    class="elevation-1"
                >
                 <template v-slot:items="props">
                    <td class="text-xs-center">{{ props.item.slot }}</td>
                    <td class="text-xs-center">{{ props.item.carNumber }}</td>
                    <td class="text-xs-center">{{ props.item.carColour }}</td>
                </template>
               </v-data-table>
            </div>
  </v-card>
</template>
<script>
export default {
  name: 'ParkingMuster',
  //  props:[
  //   'muster',
    
  // ],
  //  mounted() {
  //    alert("in parking muster")
  //       this.getParkingMuster()
  //     },
   data: function() {
    return {
         search:"",
         muster:[],
       responseDTO:{
         status:"",
         reason:"",
         details:[]
       },
         header:[
        {text: "Slot",value: "slot", align: 'center'},
        {text: "Car Number",value: "carNumber", align: 'center'},
        {text: "Car Colour",value: "carColour", align: 'center'},
      ],

    };
  },
  // methods: {
  //   async getParkingMuster(){
        
  //       this.$http.get("/parking-service/status")
  //       .then(response => {   
  //           return response.json();
  //       })
  //       .then(json => {
  //         if (json != null) {
  //           this.responseDTO = json
  //           if(this.responseDTO.status === 'Successful'){
  //             if ( this.muster.length>=0) {
  //             this.muster = this.responseDTO.details
  //             }
  //           }else{
  //             this.errorMessage = this.responseDTO.reason
  //           }
  //         }
  //       });
  //     }
  // },
};
</script>
