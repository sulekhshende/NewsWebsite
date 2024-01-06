import * as React from 'react';
import { useEffect } from "react" 
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { checkFiles } from '../Validation/ValidateFiles'


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

type FileProps = {
    files : File[];
    setFiles : (file: File[]) => void
}

export default function FileSelected({files, setFiles} : FileProps) {
 
  useEffect(()=>{
    checkFiles(files)
  }, [files])
 
  const handleDelete = (FileToDelete: File) => () => {
        setFiles([...files.filter((chip:any) => chip.name !== FileToDelete.name)]);
  };

  if(files === null)
      return(<></>)

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {files.map((data,index) => {
        let icon;
        return (
          <ListItem key={index}>
            <Chip
              icon={icon}
              label={data.name}
              onDelete={ handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
