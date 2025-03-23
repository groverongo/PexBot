import subprocess

def get_ext(filename):
    return filename.split(".")[-1]

def change_ext(filename, ext):
    return filename.split(".")[0] + ext

def pcm_to_mp3(input_pcm, output_mp3, sample_rate=16000):
    command = [
        "ffmpeg", "-y",
        "-f", "s16le",  
        "-ar", str(sample_rate), 
        "-ac", "1",  
        "-i", input_pcm, 
        "-b:a", "46k",
        output_mp3  # Output MP3 file
    ]
    subprocess.run(command, check=True)
