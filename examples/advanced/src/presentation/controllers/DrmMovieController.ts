import { useCallback, useEffect, useState } from "react"
import { DrmMovie } from "../../domain/model/DrmMovie"
import { GetDrmMovies } from "../../domain/usecase/GetDrmMovieUseCase"
import { MovieRepositoryImpl } from "../../data/repository/MovieRepositoryImpl"
import MovieUserDataSourceImpl from "../../data/datasource/MovieUserDataSource"
import { downloadState } from "../../domain/model/DownloadState"
import PallyConMultiDrmSdk, {
  PallyConEventType,
  PallyConContentConfiguration,
  PallyConDownloadState,
} from "pallycon-react-native-sdk"

export default function DrmMovieController() {
  const [movies, setMovies] = useState<DrmMovie[]>([])
  const [pallyConContentConfigs, setPallyConContentConfigs] = useState<
    PallyConContentConfiguration[]
  >([])
  const [downloadPercent, setDownloadPercent] = useState<[string, number][]>([])
  const [error, setError] = useState<string>("")
  const [isSdkInit, setSdkInit] = useState<boolean>(false)
  const siteId = "DEMO"
  const [listeners, setListeners] = useState<
    ReturnType<typeof PallyConMultiDrmSdk.addPallyConEvent>[]
  >([])

  const UseCase = new GetDrmMovies(
    new MovieRepositoryImpl(new MovieUserDataSourceImpl())
  )

  const sdkInit = () => {
    setSdkInit(true)
    PallyConMultiDrmSdk.initialize(siteId)
  }

  const setPallyConEvents = () => {
    if (listeners.length == 0) {
      const events = []
      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.complete,
          (event) => {
            updateMovies(event.url, "downloadState", downloadState.success)
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.pause,
          (event) => {
            updateMovies(event.url, "downloadState", downloadState.pause)
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.remove,
          (event) => {
            updateMovies(event.url, "downloadState", "")
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.stop,
          (event) => {
            updateMovies(event.url, "downloadState", "")
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.download,
          (event) => {
            updateMovies(event.url, "downloadState", downloadState.running)
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.contentDataError,
          (event) => {
            setError(event.errorCode + ": " + event.message)
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.drmError,
          (event) => {
            setError(event.errorCode + ": " + event.message)
            // updateMovies(event.url, "downloadState", downloadState.failed);
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.licenseServerError,
          (event) => {
            setError(event.errorCode + ": " + event.message)
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.downloadError,
          (event) => {
            setError(event.errorCode + ": " + event.message)
            updateMovies(event.url, "downloadState", downloadState.failed)
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.networkConnectedError,
          (event) => {
            setError(event.errorCode + ": " + event.message)
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.detectedDeviceTimeModifiedError,
          (event) => {
            setError(event.errorCode + ": " + event.message)
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.migrationError,
          (event) => {
            setError(event.errorCode + ": " + event.message)
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.licenseCipherError,
          (event) => {
            setError(event.errorCode + ": " + event.message)
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.unknownError,
          (event) => {
            setError(event.errorCode + ": " + event.message)
          }
        )
      )

      events.push(
        PallyConMultiDrmSdk.addPallyConEvent(
          PallyConEventType.progress,
          (event) => {
            updateProgress(event.url, event.percent)
          }
        )
      )

      setListeners(events)
    }

    PallyConMultiDrmSdk.setPallyConEvents()
  }

  const updateMovies = useCallback(
    (url: string | null, name: any, value: any) => {
      setMovies((prevMovies) => {
        const newArray = prevMovies.map((item, i) => {
          if (url === item.url) {
            return { ...item, [name]: value }
          } else {
            return item
          }
        })
        return newArray
      })
    },
    []
  )

  const getMovies = async () => {
    await setConfigs(await UseCase.invoke())
  }

  const downloadCheck = async (config: PallyConContentConfiguration) => {
    try {
      const state = await PallyConMultiDrmSdk.getDownloadState(config)
      switch (state) {
        case PallyConDownloadState.DOWNLOADING:
          return downloadState.running
        case PallyConDownloadState.PAUSED:
          return downloadState.pause
        case PallyConDownloadState.COMPLETED:
          return downloadState.success
        default:
          return downloadState.pending
      }
    } catch (e: any) {
      setError(e.message)
      return downloadState.failed
    }
  }

  const setConfigs = async (drmMovies: DrmMovie[]) => {
    const configs: PallyConContentConfiguration[] = []
    const movies: DrmMovie[] = []
    for (let i = 0; i < drmMovies.length; i++) {
      const config: PallyConContentConfiguration = {
        contentUrl: drmMovies[i].url,
        contentId: drmMovies[i].contentId,
        token: drmMovies[i].token,
        licenseUrl: drmMovies[i].licenseUrl,
        licenseCipherTablePath: drmMovies[i].licenseCipherTablePath,
        certificateUrl: drmMovies[i].certificateUrl,
      }

      const needsMigration = await PallyConMultiDrmSdk.needsMigrateDatabase(
        config
      )
      if (needsMigration) {
        await PallyConMultiDrmSdk.migrateDatabase(config)
      }

      const downloadState = await downloadCheck(config)
      const movie = drmMovies[i]
      movie.downloadState = downloadState
      movies.push(movie)
      configs.push(config)
    }

    setMovies(movies)
    setPallyConContentConfigs(configs)
  }

  const getPlayerData = async (movie: DrmMovie): Promise<string> => {
    if (!isSdkInit) {
      sdkInit()
    }

    const index = pallyConContentConfigs.findIndex(
      (element) => element.contentUrl === movie.url
    )

    try {
      return await PallyConMultiDrmSdk.getObjectForContent(
        pallyConContentConfigs[index]
      )
    } catch (e: any) {
      setError(e.message)
      return ""
    }
  }

  const downloadMovie = async (movie: DrmMovie): Promise<void> => {
    if (!isSdkInit) {
      sdkInit()
    }

    const index = pallyConContentConfigs.findIndex(
      (element) => element.contentUrl === movie.url
    )
    if (movies[index].downloadState === downloadState.pause) {
      await PallyConMultiDrmSdk.resumeDownloads()
    } else {
      try {
        await PallyConMultiDrmSdk.addStartDownload(
          pallyConContentConfigs[index]
        )
      } catch (e: any) {
        setError(e.message)
      }
    }

    updateMovies(movie.url, "downloadState", downloadState.running)
  }

  const pauseMovie = (movie: DrmMovie) => {
    if (!isSdkInit) {
      sdkInit()
    }

    PallyConMultiDrmSdk.pauseDownloads()
  }

  const removeMovie = async (movie: DrmMovie): Promise<void> => {
    if (!isSdkInit) {
      sdkInit()
    }

    const index = pallyConContentConfigs.findIndex(
      (element) => element.contentUrl === movie.url
    )

    try {
      await PallyConMultiDrmSdk.removeDownload(pallyConContentConfigs[index])
    } catch (e: any) {
      setError(e.message)
    }
  }

  const removeLicense = async (movie: DrmMovie) => {
    if (!isSdkInit) {
      sdkInit()
    }

    const index = pallyConContentConfigs.findIndex(
      (element) => element.contentUrl === movie.url
    )

    try {
      await PallyConMultiDrmSdk.removeLicense(pallyConContentConfigs[index])
    } catch (e: any) {
      setError(e.message)
    }
  }

  // const updateMovies = (url: string | null, name: any, value: any) => {
  //     const newArray = movies.map((item, i) => {
  //         if (url === item.url) {
  //             return {...item, [name]: value};
  //         } else {
  //             return item;
  //         }
  //     });
  //     setMovies(newArray);
  // };

  const updateProgress = (url: string | null, percent: number | null) => {
    const index = downloadPercent.findIndex((element) => element[0] === url)
    if (url !== null && index < 0) {
      updateMovies(url!, "downloadState", downloadState.running)
      downloadPercent.push([url!, 0])
    }

    const newArray = downloadPercent.map((item, i) => {
      if (url === item[0]) {
        item[1] = percent ? Math.floor(percent) : 0
      }
      return item
    })
    setDownloadPercent(newArray)
  }

  const removeListeners = () => {
    setListeners([])
  }

  const clearError = () => {
    setError("")
  }

  return {
    sdkInit,
    setPallyConEvents,
    getMovies,
    getPlayerData,
    downloadMovie,
    pauseMovie,
    removeMovie,
    removeLicense,
    removeListeners,
    clearError,
    downloadPercent,
    movies,
    error,
  }
}
