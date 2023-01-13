ilk basta router islemini projemizi ekliyoruz.
yarn add vue-router@4

router dosyasi altindaki index.js dosyasi altina view lerin icinde 
olusturdugumuz componentlari import ettik. burada view mantigi aslinda path management.

Hocanin hazirladigi ve tema altinda buluna hazir html kodlarina view altina ve component altina tasidik

View ler ile ayni isimde component adi olusturuyoruz ve bu sayede hangi sayfada hangi componentlari bulduk daha kolay buluyoruz.

ayni zamanda "Shared" klasoru ile bir cok sayfada ortak kullandiigmiz componentlari topluyoruz. ornegin head yada footer gibi. daha sonra bu common veya shared component lari main js altinda cagiriyoruz.
app.component("appHeader",appHeader);
yukarida oldugu gibi register yapinca template icinde rahatca cagiriyoruz.
<template>
        <AppHeader></AppHeader>
</template>


json-server calistiriyoruz.
json-server db.json watch
Daha sonra axios u sisteme entegre ediyoruz
yarn add axios

Daha sonra Utils klasoru olusturup Axios ayarlarina uygulamanin her yerinden ulasmak icin appAxios.js icine ayarlari giriyoruz.

CryptoJS sayesinde register sayfasinda kullancidan aldigimiz password encrypt ederek database e kayit ediyoruz.

Kullanici login olduktan sonra login'e ozel icerikleri gormesi icin bu bilgiyi tum componentlara vermek gerekiyor
Bunu vuex sayesinde tum yapilar kolayca alacak

yarn add vuex@next >> ile vuex projemize ekliyoruz.

login sayfasina basit bir get istedigi ile mock db uzerinden kullanici var mi yok kotnrol ettik

burada esas onemli kisim vuex uzerinde state leri login durumuna gore degistirdik. Mutation icindeki setUser fonksiyonu ile kullanicin aktif oldugunu sisteme soyledik ve _isAuthenticated getter i ile birlikte bunu tum app in hizmetine sunduk.bunu da appHeader icinde bulunan 
          <div v-if="_isAuthenticated" class="ml-auto flex items-center">
kod bloguna soyledik ve eger kullanici login olduysa new butonu sag ust kosede gorulecek

burada problem sayfayi yenileyince "_isAuthenticated" sifirlanmasi ve login bilgisini kaybediyor olmamiz. bunun icin state kayit altina almami lazim.

yarn add vuex-persistedstateComp.vue:

kod blogu ile bu kutuphaneyi projemize ekliyoruz
Daha sonra asagıdaki yapi ile birlitke kullaniyoruz. bu bir plugin. vuex/store.js icine entegre ediyoruz.
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

        createPersistedState({  // bu arkadasin sitesini kontrol edip ozellestirebiliyoruz.
          storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key)
          }
        })

Bu kisimda onemli olan state management ile kullanicinin login olup olmadigina gore verdgimiz kararlardi.
- kullanici login oldug mu?
- login olmadan hangi sayfalari goremez
- login olunca tekrar login tarafina veya register sayfasina gitmesine izin vermeme gibi kavramlari ele aldik.

1- kullanici login oldu mu?
from store.index.js
mutations : {
        setUser(state,user){
            state.user = user;
        },
from loginCOMP
if (login_response?.data?.length > 0) {
            this.$store.commit("setUser", login_response?.data[0]);

burada kullanici username password girdiginde login response durumuna gore, bunlari http response type vs de olabilir setuser yardimi ile state.user degiskenini guncelliyoruz

2- login durumuna gore veya diger durumlara gore, kullanicinin hangi sayfalara gidip gidemiyecegini router icinde bulunan index.js uzerinden yonetiyoruz. bu yonetimi yine state mangement icin olusturugumuz store/index.js icinde bulunan degiskenlere gore beliriyoruz.
