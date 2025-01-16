import image1 from "../../Assets/ammo.rocket.basic_512.png";
import image2 from "../../Assets/Auto_Turret_icon.webp";
import image3 from "../../Assets/buckshot.png";
import image4 from "../../Assets/eoka_512.png";
import image5 from "../../Assets/F1_Grenade_icon.webp";
import image6 from "../../Assets/HeavyPlateHelmet.png";
import image7 from "../../Assets/hqm.png";
import image8 from "../../Assets/crates.png";
import image9 from "../../Assets/MetalFacemask.png";
import image10 from "../../Assets/Semi-Automatic.webp";
import image11 from "../../Assets/furnace_512.png";
import image12 from "../../Assets/rock.png";
import image13 from "../../Assets/bow.webp";
import image14 from "../../Assets/Explosive_5.56.webp";
import image15 from "../../Assets/Hammer.png";
import image16 from "../../Assets/jackhammer.png";
import image17 from "../../Assets/Pickaxe.png";
import image18 from "../../Assets/SalvagedAxe.png";
import image19 from "../../Assets/Assault_Rifle.webp";

const imageArray = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
];

export const data = imageArray.map((card, index) => ({
  id: index + 1,
  image: card,
}));
