type devices = "mobile" | "desktop" | "tab";

export const whereYouAreLoggedInData: {
  name: string
  location: string
  device: devices
  date: string
}[] = [
    {
      name: "Iphone 12 mini",
      location: "Lekki phase 1, Lagos Nigeria",
      device: "mobile",
      date: new Date("2024-01-25").toString().split("G")[0]!,
    },
    {
      name: "Dell Latitude 5420",
      location: "Lekki phase 1, Lagos Nigeria",
      device: "desktop",
      date: new Date("2023-12-02").toString().split("G")[0]!,
    },
    {
      name: "Ipad 3 Air",
      location: "5 Omorinre Lekki, Lagos Nigeria",
      device: "tab",
      date: new Date("2023-10-02").toString().split("G")[0]!,
    },
    {
      name: "MacBook Pro M2",
      location: "5 Omorinre Lekki, Lagos Nigeria",
      device: "desktop",
      date: new Date("2023-10-02").toString().split("G")[0]!,
    },
  ]
