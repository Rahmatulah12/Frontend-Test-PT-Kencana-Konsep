<template>
    <v-row>
        <v-col
            cols="12"
        >
            <v-card
                elevation="2"
                shaped
            >
                <v-card-title>
                    Student Hobby
                </v-card-title>
                <v-card-subtitle>
                    List Student Hobby
                </v-card-subtitle>

                <v-divider class="mt-1 mb-5 mx-3"></v-divider>

                <div class="d-flex flex-row-reverse mr-5 mb-3">
                    <v-btn
                        color="primary"
                        small
                        @click="$router.push('/add-student-hobby')"
                    >
                        Add Student Hobby
                        <v-icon dark right>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </div>

                <v-col
                    cols="12"
                    md="12"
                >
                    <v-simple-table fixed-header height="300">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-justify">
                                        Student Name
                                    </th>
                                    <th class="text-justify">
                                        Hobby
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(item,index) in items" :key="index"
                                >
                                    <td class="text-justify">
                                        {{ ucwords(item.student_name) }}
                                    </td>
                                    <td class="text-justify">
                                        {{ ucwords(item.hobby) }}
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
                
            </v-card>

        </v-col>

    </v-row>
</template>
<script>
import axios from '../../api';
export default {
      name:"StudentHobby",

      metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: 'Test PT. Kencana Konsep',
            // all titles will be injected into this template
            titleTemplate: '%s | Student Hobby'
      },

      data(){
            return {
                  items: [],
            }
      },

      mounted(){
            this.size = 25;
            this.page = 1;
            this.getAllData();
      },

      methods: {
            async getAllData(){
                  try{
                        // let url = this.keyword != null && this.keyword.length > 0 ? 
                        //             `student-hobby?keyword=${this.keyword}&size=${this.size}&page=${this.page}` :
                        //             `student-hobby?size=${this.size}&page=${this.page}`;
                        let data = await axios.get(`student-hobby`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
                        if(data){
                              let dataTemp = [];
                              for(let i = 0; i < data.data.data.length; i++){
                                    let temp = data.data.data[i].hobby.split(',');
                                    let joinTemp = temp.join(", ");
                                    dataTemp.push({student_name: data.data.data[i].student_name, hobby: joinTemp});
                              }
                              this.items = dataTemp;
                              // this.totalPage = Math.ceil(data.data.data.total / this.size);
                        }
                  } catch (err){
                        if(err.response.status == 401){
                              localStorage.removeItem("token");
                              this.$router.push("/login");
                              this.$toast.open({
                                    message: `${err.response.data.message}`,
                                    type: "error",
                                    dissmissible: true,
                                    position: "top-right",
                                    duration: 5000,
                              });
                        } else {
                              this.$toast.open({
                                    message: `${err}`,
                                    type: "error",
                                    dissmissible: true,
                                    position: "top-right",
                                    duration: 5000,
                              });
                        }        
                  }
            },

            ucwords(str){
                  return str.replace (/\w\S*/g, 
                  function(txt)
                  {  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); } );
            },
      },
}
</script>
<style lang="scss">
    @import '../../assets/scss/table.scss';
</style>