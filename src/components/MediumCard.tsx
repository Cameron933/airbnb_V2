import Image from "next/image";

type CardProps = {
  img: string;
  title: string;
};

const MediumCard = ({ img, title }: CardProps) => {
  return (
    <div className="transform cursor-pointer transition duration-300 ease-out hover:scale-105">
      <div className="relative h-80 w-80">
        <Image className="rounded-xl" src={img} alt={`${title}img`} fill />
      </div>
      <h3 className="mt-3 text-2xl">{title}</h3>
    </div>
  );
};

export default MediumCard;
