import { Avatar, Card, Col, Grid, Navbar, Spacer, Text } from '@nextui-org/react'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

const imageContent = {
  'Project 1': [
    'https://ionicframework.com/docs/icons/logo-react-icon.png',
    'https://ui-lib.com/blog/wp-content/uploads/2021/12/nextjs-boilerplate-logo.png',
    'https://cdn.vox-cdn.com/thumbor/GME4L3VkVjDEyKJTDG87qAGqARk=/0x0:1280x800/1400x1050/filters:focal(640x400:641x401)/cdn.vox-cdn.com/uploads/chorus_asset/file/19700731/googlemaps.png'
  ],
  'Project 2': [
    'https://play-lh.googleusercontent.com/algsmuhitlyCU_Yy3IU7-7KYIhCBwx5UJG4Bln-hygBjjlUVCiGo1y8W5JNqYm9WW3s',
    'https://ionicframework.com/docs/icons/logo-react-icon.png',
    'https://logos-world.net/wp-content/uploads/2021/02/Google-Cloud-Emblem.png'
  ],
  'Project 3': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1200px-Tensorflow_logo.svg.png',
    'https://e7.pngegg.com/pngimages/447/294/png-clipart-python-javascript-logo-clojure-python-logo-blue-angle.png'
  ],
  'Project 4': [
    'https://ionicframework.com/docs/icons/logo-react-icon.png',
    'https://ui-lib.com/blog/wp-content/uploads/2021/12/nextjs-boilerplate-logo.png',
  ],
}

interface contentInterface {
  name: string
  projectName: string
  html_url: string
}

export default function Home() {

  const [content, setContent] = useState<undefined | contentInterface[]>()

  React.useEffect(() => {
    const fetchRepo = async () => {
      const info = await fetch("https://api.github.com/users/Yash-Popcorn/repos")
      return await info.json()
    }

    fetchRepo().then((result) => {
      const info: contentInterface[] = []

      for (const i in result) {
        info.push({
          name: result[i].name,
          projectName: 'Project ' + (Number(i) + 1),
          html_url: result[i].html_url
        })
      }

      setContent(info)
    })
  }, [])

  const AvatarCard = (_props: {image: string}) => {
    return <Avatar
      key={Date.now()}
      size="lg"
      src={_props.image}
      color="gradient"
      bordered
      zoomed
      onClick={() => {
        console.log("EEE")
      }}
    />
  }

  const ProjectCard = (_props: {value: contentInterface}) => {
    console.log()
    return (
        <>
          <Card variant='bordered' css={{
            maxWidth: "50%",
            maxHeight: "35%",
            scale: .8
          }} isHoverable isPressable onPress={() => {
            window.open(_props.value.html_url)
          }}>
          <Card.Header>
              <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                  {_props.value.projectName}
                </Text>

                <Text h3 color="white">
                  {_props.value.name}
                </Text>
              </Col>
            </Card.Header>

            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src="/pfp.png"
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </Card.Body>

            <Card.Footer>
              {
                imageContent[_props.value.projectName as keyof typeof imageContent].map(value => {
                  return <AvatarCard key={Math.floor(Math.random() * 100)} image={value}/>
                })
                
              }
            </Card.Footer>
          </Card>
        </>
    )
  }

  return (
    <>
      <div>
        <Navbar isBordered>
          <Navbar.Brand>
            <Text b color="inherit">
                {"Yash's Portfolio"}
            </Text>
          </Navbar.Brand>

          <Navbar.Content>
            <Navbar.Link href="/">Projects</Navbar.Link>
          </Navbar.Content>
        </Navbar>
      </div>

        <Grid.Container justify="center" css={{
          alignContent: "center",
          alignItems: "center",
          top: "15%"
        }}>
          {
            content && content.map((value) => {
              return <ProjectCard key={Math.floor(Math.random() * 100)} value={value}/>
            })
          }
        </Grid.Container>
    </>
  )
}
