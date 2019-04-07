<template>
  <div class="accordion" id="accordionExample" v-if="taniData">
    <div class="card" v-for="(key, index) in Object.keys(taniData)" :key="index">
      <div class="card-header" :id="index">
        <h2 class="mb-0">
          <button
            class="btn font-weight-bold"
            type="button"
            data-toggle="collapse"
            :data-target="'#no'+ index "
            aria-expanded="true"
            :aria-controls="'no' + index "
          >Date {{taniData[key].date}}</button>
        </h2>
      </div>

      <div
        :id="'no'+ index"
        class="collapse"
        :aria-labelledby="index"
        data-parent="#accordionExample"
      >
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item detail" v-if="taniData[key].tani">
              <i class="fas fa-chevron-right"></i>
              &nbsp;Tani: {{taniData[key].tani}}
            </li>

            <li class="list-group-item" v-if="taniData[key].cone">
              <p
                class="detail mb-0"
                v-for="(typeofcone, i) in Object.keys(taniData[key].cone)"
                :key="i"
              >
                <i class="fas fa-chevron-right"></i>
                &nbsp;
                {{typeofcone}} - Cone : {{taniData[key].cone[typeofcone]}} Kg
              </p>
            </li>

            <li class="list-group-item detail" v-if="taniData[key].saree">
              <i class="fas fa-chevron-right"></i>
              &nbsp;Saree Details: {{taniData[key].saree}}
            </li>

            <li class="list-group-item" v-if="taniData[key].zari">
              <p
                class="detail mb-0"
                v-for="(typeofzari, i) in Object.keys(taniData[key].zari)"
                :key="i"
              >
                <i class="fas fa-chevron-right"></i>
                &nbsp;
                {{typeofzari}} - Zari : {{taniData[key].zari[typeofzari]}} Kg
              </p>
            </li>

            <li class="list-group-item detail" v-if="taniData[key].money">
              <i class="fas fa-chevron-right"></i>
              &nbsp;Money: {{taniData[key].money}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaniDataList",
  props: ["taniData"]
};
</script>

<style scoped>
button {
  margin-right: 0.2rem;
  font-size: 0.9rem;
}
.detail {
  font-size: 14px;
}
.detail > i {
  font-size: 12px;
}
.card-body,
.card-header {
  padding: 0;
}
.card {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125) !important;
}
</style>
