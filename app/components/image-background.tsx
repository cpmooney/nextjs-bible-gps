import Image from 'next/image';

const backgroundTheme = {
    light: {
        backgroundUrl: '/images/light-gray-concrete-wall.jpg',
        attributionUrl: 'https://www.freepik.com/free-photo/old-cement-wall-texture_920589.htm#query=light%20gray%20concrete%20wall&position=1&from_view=keyword&track=ais&uuid=9b54fee3-6488-4795-ace4-2e69e0dd26bc',
        attributionAnchor: 'Image by asierromero'
    },
    dark: {
        backgroundUrl: '/images/grunge-wall-texture.jpg',
        attributionUrl: 'https://www.freepik.com/free-photo/grunge-wall-texture_1118532.htm#query=dark%20grey%20concrete%20wall&position=2&from_view=search&track=ais',
        attributionAnchor: 'Image by kues1 on Freepik'
    }
}

export const ImageBackground = () => {
    const { backgroundUrl, attributionUrl, attributionAnchor } = backgroundTheme.light;
    return (
      <div style={{overflow: 'hidden'}}>
        <Image
          style={{zIndex: -1 }}
          src={backgroundUrl}
          alt=""
          layout="fill"
          objectFit="cover"
          />
      <div className="fixed bottom-0">
        <a href={attributionUrl}>{attributionAnchor}</a> on Freepik
      </div>
      </div>
    )
  };