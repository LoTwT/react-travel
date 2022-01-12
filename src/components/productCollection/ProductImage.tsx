import { Image, Typography } from "antd"

interface PropsType {
  size: "large" | "small"
  id: string | number
  imageSrc: string
  price: number | string
  title: string
}

export const ProductImage: React.FC<PropsType> = ({
  size,
  id,
  imageSrc,
  price,
  title,
}) => {
  const sizeToSet =
    size === "large" ? { width: 490, height: 285 } : { width: 240, height: 120 }

  return (
    <>
      <Image src={imageSrc} width={sizeToSet.width} height={sizeToSet.height} />
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>
          ￥ {price} 起
        </Typography.Text>
      </div>
    </>
  )
}
