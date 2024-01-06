export function checkFiles(file: any){   // validate files
    let image_count = 0;
    let image_indexTOdelte: number | null = null;
    let video_count = 0;

    if(file.length<=2){
        file.forEach((item:File, index:number)=>{
            if(item.type.split("/")[0] === 'image'){
                image_count++;
            }
            else
                video_count++;
        })
        
        if(image_count === 1)
            return true;
        
    }

}


