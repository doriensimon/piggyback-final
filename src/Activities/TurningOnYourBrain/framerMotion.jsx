import { motion } from "framer-motion";

export default function findShapes(props) {
  return (
    <motion.div
      animate={{ x: [0, 500, 0] }}
      transition={{
        duration: props.motionSpeed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <img
        className="flashingPicsImage"
        src={props.imagePath + props.displayImage + ".png"}
        style={{ visibility: props.showShape }}
      />
    </motion.div>
  );
}
