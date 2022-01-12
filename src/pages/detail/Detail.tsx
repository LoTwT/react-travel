import { RouteComponentProps } from "react-router-dom"

interface MatchParams {
  touristRouteId: string
}

export const Detail: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  return (
    <h1>旅游路线详情页面, 路线 id : {props.match.params.touristRouteId}</h1>
  )
}
