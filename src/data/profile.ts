export interface ProfileInfo {
  name: string;
  birthPlaceDate: string;
  family: {
    role: string;
    father: { name: string; age: number };
    mother: { name: string; age: number };
  };
  career: {
    company: string;
    position: string;
    locations: string[];
  };
  hobbies: string[];
  physical: {
    height: string;
    weight: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  photo: string;
  bioQuotes: string;
}

export const raihanProfile: ProfileInfo = {
  name: "Raihan Fadhlurahman",
  birthPlaceDate: "Jakarta, 29 Oktober 2002",
  family: {
    role: "Anak Tunggal",
    father: {
      name: "Rheinold Thamrin",
      age: 65,
    },
    mother: {
      name: "Sri Suhartiningsih",
      age: 60,
    },
  },
  career: {
    company: "PLN Icon+",
    position: "IT Operation & Maintenance",
    locations: [
      "PLN Icon Plus Mampang",
      "PT State Grid Indonesia — Gedung Pacific Century Place SCBD, Jakarta",
    ],
  },
  hobbies: [
    "Traveling — Menjelajahi tempat baru & menciptakan kenangan indah",
    "Simulator Games — Menikmati simulasi penerbangan & eksplorasi virtual",
  ],
  physical: {
    height: "± 180 cm",
    weight: "± 90 kg",
  },
  contact: {
    phone: "082240463327",
    email: "fadhlurahmanraihan29@gmail.com",
    address: "Griya Bukit Jaya Blok i2 No 32, Gunung Putri, Kabupaten Bogor 16963",
  },
  photo: "./images/about-raihan.webp",
  bioQuotes: "Seorang pria yang siap bertanggung jawab, tumbuh bersama, dan mendedikasikan hari-harinya untuk membahagiakan Arum.",
};
