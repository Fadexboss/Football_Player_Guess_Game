import data2 from './players.json';
import './App.css'
import './App.scss'
import React, { useState,useEffect,useRef } from 'react';

const App = () => {
        // Veritabanından Seçilen Futbolcunun Sınırlaması 
        const Player_Size=2;
        // Veritabanını Arama Kutusunda Gösterimi için aktarımı
        const allOptions=data2;
        // Giriş ekranındaki resimlerin linkleri
        const images = [
          "https://www.teahub.io/photos/full/20-207756_messi-vs-real-madrid-wallpaper-lionel-messi-shirt.jpg",
          "https://wallpaperaccess.com/full/3927047.jpg",
          "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltd4010713a7be58e9/60de18c30401cb0ebfb32c5e/58943039a84bf2eff8a0a45683d59871383684f9.jpg",
          "https://wallpapercave.com/wp/wp3717593.jpg",
          "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2020%2F11%2F25%2FGettyImages-1016702318.jpg",
          "https://eu-images.contentstack.com/v3/assets/blta90d05ad41a54a71/bltabd81d941f4bbd77/6249f7167dd3011e9a0377cd/2E9GC3R.jpg"
        ];
        
        // Gerekli usestate bileşenlerini tanımlama
        const [true_Player, set_true_Player] = useState([]);
        const [searchValue, setSearchValue] = useState('');
        const [tableData, setTableData] = useState([]);
        const [showPopup, setShowPopup] = useState(false);
        const [selectedImage, setSelectedImage] = useState("");
        const [options, setOptions] = useState(allOptions);
        const inputRef = useRef(null);
        const buttonRef = useRef(null);

        // Klavyedeki Enter tuşunu basıldığında guess butonunu tetikleme handlekeypress fonksiyonu
        function handleKeyPress(event) {
                if (event.key === 'Enter') {
                  buttonRef.current.click();
              }
          }
          // options dizisindeki mapleme işlemi ile her bir öğe için bir seçenek oluşturur
          const optionList = options.map((option) => (
            <option key={option.x} value={option.Known_As} />
          ));
      
          // Verilen Linklerden Rastgele bir resim seçer ve seçilen resmi ayarlar
        const selectRandomImage = () => {
          // Resimler dizisinden rastgele bir indis seçer
          const randomIndex = Math.floor(Math.random() * images.length);
          setSelectedImage(images[randomIndex]);
          // Resmi Popup olarak gösterir
          setShowPopup(true);
        };
      // Ana ekran resmi için useeffect fonksiyonu
        useEffect(() => {
          selectRandomImage();
        }, []);
        
      const both =()=>{
        setShowPopup(false);
        handleButtonClick2();
      }
      // Butona tıklandığında işlemleri yönetir
  function handleButtonClick2() {
        var number=Math.floor(Math.random() * Player_Size);
        const matchingData2 = data2.find(item => item.x === number);
        // true_Player'ı günceller, yeni veriyle birlikte
        set_true_Player([matchingData2,true_Player]);
             
  }  
  // veritabanındaki eşleşen isimleri tolowercase fonskiyonu ile küçükharfle yazar ve veritabanıyla eşleştirir tabloda gösteriri
  const handleButtonClick = () => { 
    const matchingData = data2.find(item => item.Known_As.toLowerCase() === searchValue.toLowerCase());
    if (matchingData) {
      setTableData([matchingData,...tableData]);
    }
  };


  // Html Kısmı

  return (
    <div>
      {showPopup && (
        <div >    
          <div className="popup">
            <div>
            <button class="btn" type="button" onClick={() => both()}>
              <p class="btnLable">
                <span class="btnHoverMask"></span>
                <span class="btnText">Start!</span>
              </p>
              </button>
            </div>
            {/* Ana ekrandaki rastgele seçilen resimerin Popup olarak gösterilmesi*/}
            <img
              className="popup-image"
              src={selectedImage}
              alt="Arkaplan Resmi"
            />
          </div>
        </div>
      )}
        <div class="container">
            <div className="container2" >
                {/* Arama kutusu */}
                <input  className='input' placeholder='Type footballer name...' onKeyPress={handleKeyPress} ref={inputRef} list="languages" type="text"  value={searchValue}  onChange={e => setSearchValue(e.target.value)}/>
                <datalist id="languages">{optionList}</datalist>
                <div class="flex-grid-center" >
                  {/* Guess Butonu */}
                <button onClick={handleButtonClick} class="pure-button fuller-button blue" ref={buttonRef} >Guess!</button>
                </div>
            </div>
            <table>
                {/* Çekilen Futbolcu bilgilerinin tablo şeklinde gösterilmesi */}
            <thead>
                <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Positions</th>
                    <th>Market Value</th>
                    <th>Clup</th>
                    <th>Country</th>
                    <th>Player Age</th>
                </tr>
                </thead>
                
                {/* Random seçilen oyuncunun bilgileri ile arama kutusuna girilen oyuncunun bilgilerini karşılaştırarak hücrelerin renklerinin kırmızı veya yeşil olarak atanması */}
                <tbody>
                {tableData.map((item, index) => (
                    <tr  key={index}>
                      <td><img width="70" height="70" src={item.Image_Link} alt={item.name} /></td>
                      <td >{item.Known_As}</td>
                      <td  style={{ backgroundColor: searchValue !== '' && item.Best_Position.toLowerCase()=== true_Player[0].Best_Position.toLowerCase() ? 'green' : 'red' }}>{item.Best_Position}</td>
                      <td style={{ backgroundColor: searchValue !== '' && item.Value === true_Player[0].Value ? 'green' : 'red' }}>{item.Value} € {searchValue !== '' && item.Value === true_Player[0].Value ? ' ' : '' | searchValue !== '' && item.Value > true_Player[0].Value ? '↓' : '↑'}</td>
                      <td style={{ backgroundColor: searchValue !== '' && item.Club.toLowerCase()=== true_Player[0].Club.toLowerCase() ? 'green' : 'red' }}>{item.Club}</td>
                      <td style={{ backgroundColor: searchValue !== '' && item.Country.toLowerCase()=== true_Player[0].Country.toLowerCase() ? 'green' : 'red' }}>{item.Country}</td>
                      <td style={{ backgroundColor: searchValue !== '' && item.Age === true_Player[0].Age ? 'green' : 'red' }}>{item.Age} {searchValue !== '' && item.Age === true_Player[0].Age ? ' ' : '' | searchValue !== '' && item.Age > true_Player[0].Age ? '↓' : '↑'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
         </div>
    </div>
  );
};
export default App;
