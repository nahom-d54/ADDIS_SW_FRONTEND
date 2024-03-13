import { css } from '@emotion/react';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react'
import { Box, Button, Flex, Text } from 'rebass';

export default function FileInput({ selectedFile, setSelectedFile }) {
    const inputRef = useRef(null)

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };


  return (
    <>
    <input onChange={handleFileChange} type="file" accept="audio/*" ref={inputRef} style={{ display: 'none' }}/>
    <Flex css={css`align-items: left;flex-direction: column`}>
        <Button type='button' onClick={() => inputRef.current.click()} css={css`font-size: 0.65em;background: var(--link-color)`}>
            <FontAwesomeIcon icon={faUpload} size='sm'/> Upload Music
        </Button>
        <Box>
            <Text css={css`font-size: 0.7em`} >
                Selected File: {selectedFile ? selectedFile.name: 'No file selected'}
            </Text>
        </Box>
    </Flex>
    </>
  )
}
