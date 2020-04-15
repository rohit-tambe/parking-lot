<template>
    <v-card
    class="mx-auto"
    max-width="344"
    raised
    v-if="show"
    >

    <v-alert :value="responseDTO.status === 'Successful'" type="success" transition="scale-transition">{{errorMessage}}</v-alert>
    <v-alert  :value="responseDTO.status === 'Failed'" color="error" transition="scale-transition">{{errorMessage}}</v-alert>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Create Parking Slot</div>
        <v-list-item-title class="headline mb-1">
            <v-text-field v-model="slot" label="Slot"></v-text-field>
            
        </v-list-item-title>
      </v-list-item-content>

    </v-list-item>

    <v-card-actions>
     <v-btn class="ma-2" tile color="primary" dark  @click="createSlot">Submit</v-btn>
    </v-card-actions>
  </v-card>
    <v-card
    class="mx-auto"
    style="width:100%"
    raised
    v-else=""
    >
    <v-alert :value="responseDTO.status === 'Successful'" type="success" transition="scale-transition">{{errorMessage}}</v-alert>
    <v-alert  :value="responseDTO.status === 'Failed'" color="error" transition="scale-transition">{{errorMessage}}</v-alert>
    <span>Enter Car Details</span>
        
    <div>
      <table style="width:100%" cellspacing=2>
                <tr>
                   <td>
                     <span><v-text-field v-model="carNumber" label="Number"></v-text-field></span>
                       
                    </td>
                    <td>
                       <!-- <v-text-field v-model="colour" label="Colour"></v-text-field> -->
                       <v-select
                        v-model="colour"
                        :items="colors"
                        label="Colours"
                        return-object
                        dense
                      ></v-select>
                    </td>
                    <td>
                       <v-btn class="ma-2" tile color="primary" dark  @click="enterCarDetails">Submit</v-btn>
                    </td>
                </tr>
      </table>
    </div>
    <div>
      <table style="width:100%" align="top">
        <th>
          Parking Slots
        </th>
        <th>
          Empty Slots
        </th>
                <tr>
                   <td>
                     <div>
               <v-data-table
                    :headers="header"
                    :items="muster"
                    item-key="slot"
                    class="elevation-1"
                    
                >
                 <template v-slot:items="props"  :class="getColorExp(props.item.carColour)">
                    <td class="text-xs-center">{{ props.item.slot }}</td>
                    <td class="text-xs-center">{{ props.item.carNumber }}</td>
                    <td>{{ props.item.carColour }}</td>
                </template>
               <template v-slot:item.actions="{ item }">
                    <v-icon
                      small
                      @click="leaveCar(item.slot)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
               </v-data-table>
            </div>
                       
                    </td>
                    <td>
                       <div>
               <v-data-table
                    :headers="emptyHeader"
                    :items="emptyMuster"
                    item-key="slot"
                    class="elevation-1"
                >
                 <template v-slot:items="props">
                    <td class="text-xs-center">{{ props.item.slot }}</td>
                </template>
               </v-data-table>
            </div>
                    </td>
                </tr>
      </table>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'ParkingLot',
   data: function() {
    return {
       slot: 0,
       carNumber: "",
       colour: "",
       show:true,
       errorMessage:"",
       responseDTO:{
         status:"",
         reason:"",
         result:"",
         details:[]
       },
        colors: ['white', 'red', 'blue', 'black'],
        search:"",
         muster:[],
         emptyMuster:[],
         header:[
        {text: "Slot",value: "slot", align: 'center',sortable: false},
        {text: "Car Number",value: "carNumber", align: 'center',sortable: false},
        {text: "Car Colour",value: "carColour", align: 'center',sortable: false},
        {text: "Action",  value: 'actions',align: 'center',sortable: false },
      ],
         emptyHeader:[
        {text: "Slot",value: "slot", align: 'center',sortable: false},
      ],
    };
  },
   mounted() {
    this.getParkingMuster()
      },
  methods: {
    async createSlot(){
        this.$http.post("/parking-service/createParkingLot", "{\"slot\":"+this.slot+"}")
        .then(response => {   
            return response.json();
        })
        .then(json => {
          if (json != null) {
            this.responseDTO = json
            if(this.responseDTO.status === 'Successful'){
              this.show = false
              this.errorMessage=this.responseDTO.result
              this.storeSize = false
              this.getParkingMuster()
               return
            }else{
              this.errorMessage = this.responseDTO.reason
               this.show = false
               this.storeSize = false
               this.getParkingMuster()
               return
            }
          }
        });
      },
    async leaveCar(slot){
        this.$http.post("/parking-service/leave", "{\"slot\":"+slot+"}")
        .then(response => {   
            return response.json();
        })
        .then(json => {
          if (json != null) {
            this.responseDTO = json
            if(this.responseDTO.status === 'Successful'){
                
              this.show = false
              this.errorMessage=this.responseDTO.result
               this.getParkingMuster()
               return
            }else{
               this.errorMessage = this.responseDTO.reason
               this.show = false
            }
          }
        });
      },
      getColorExp: function(status) {
      if (status == "white") {
        return "white lighten-4";
      } else if (status == "blue") {
        return "blue lighten-4";
      } else if (status == "red") {
        return "red lighten-4";
      } else if (status == "black") {
        return "grey lighten-4";
      } 
    },
    async enterCarDetails(){
        this.$http.post("/parking-service/park","{\"ragistrationNo\":\""+this.carNumber+"\",\"colour\":\""+this.colour+"\"}")
        .then(response => {   
            return response.json();
        })
        .then(json => {
          if (json != null) {
            this.responseDTO = json
            if(this.responseDTO.status === 'Successful'){
              this.show = false
              this.carNumber=""
              this.colour=""
              this.getParkingMuster()
              this.errorMessage = this.responseDTO.result
              return
            }else{
               this.show = false
                this.errorMessage = this.responseDTO.reason
            }
          }
        });
      },
      getParkingMuster(){
        this.$http.get("/parking-service/status").then(response => {   
            return response.json();
        })
        .then(json => {
          if (json != null) {
            this.responseDTO = json
            if(this.responseDTO.status === 'Successful'){
              if ( this.responseDTO.details.length >= 0) {
                this.show=false
                this.muster=[]
                this.emptyMuster=[]
                for (let index = 0; index < this.responseDTO.details.length; index++) {
                    const items = this.responseDTO.details[index];
                    if (items["carNumber"].length > 0) {
                      this.muster.push(items)
                    }else{
                      this.emptyMuster.push(items)
                    }
                  }
                  //  this.errorMessage = this.responseDTO.result
              }
              return
            }else{
              this.errorMessage = this.responseDTO.reason
            }
          }
        });
      }
  }
};
</script>
