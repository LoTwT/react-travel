import { Image, Typography } from "antd"
import { withRouter, RouteComponentProps, Link } from "react-router-dom"

interface PropsType extends RouteComponentProps {
  size: "large" | "small"
  id: string | number
  imageSrc: string
  price: number | string
  title: string
}

const _ProductImage: React.FC<PropsType> = ({
  size,
  id,
  imageSrc,
  price,
  title,
  history,
  location,
  match,
}) => {
  const sizeToSet =
    size === "large" ? { width: 490, height: 285 } : { width: 240, height: 120 }

  return (
    <Link to={`detail/${id}`}>
      <Image src={imageSrc} width={sizeToSet.width} height={sizeToSet.height} />
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>
          ￥ {price} 起
        </Typography.Text>
      </div>
    </Link>
  )
}

export const ProductImage = withRouter(_ProductImage)
