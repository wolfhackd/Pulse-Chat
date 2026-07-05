import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/HomeRoute.tsx"),

  route("/signup", "routes/SignupRoute.tsx"),
  route("/login", "routes/LoginRoute.tsx"),

  layout("layouts/PrivateLayout.tsx", [
    route("/room", "routes/HomeRoomRoute.tsx"),
    route("/room/:roomId", "routes/RoomRoute.tsx"),
  ])

 
] satisfies RouteConfig;

