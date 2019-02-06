import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  fuelpump: string;
  shop: string;
  man: string;
  mapstyle:any;
  house:string;

  constructor() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("im onine")
        } else {
          // No user is signed in.
          console.log("im offline")
        }
      });
    // this.man = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPgSURBVGhD7ZZ/aNR1GMcX+q+EGEn/dHdBW9PMoVY4TN197zu92/e8nJvubkTZXFloEoQTApWiVvZPq24/MqMDIxiky7adM1FKGOX+EEH/KOd/goG2drtzu5P5fXqez57Z4/mpHCT3GdwbXux4vq/nw/vD7Y4rKeY/4vf7qzBH8e9VZAT5kR/NnuAF3sPioGEIeRWVB6ZMg4NF60Txf+Id1s0NljwnS4eDFnywsxrOtofg4qGQa/mrJnF+DVVz3xXLshZQ+WC1Bfu32/BTWxBy34cBkn9zrDWoLmjbto/XzAt+NpY2RKybN75z7iifT+NGK4eXXsJr5qWluXpT0+aAtryEnLe22ht5zbz0fRT0tzTZ2vIScsjlNfMCP9Q/mDpaM6krL1EOurxmZtxkuE9XXoLOMdbNjdsbKod+Z1R3AQU+c5Mbylg3OzBQs9ztdy7nXwJnl9yks4y12RH4+pGHILEQ4JvSKRIPg5uYt4Afz54cPvyuBzpLQNKd2PcoPzY/5V+Me3YMTFz8cHDCvdLpuX2JS12L4cBg1t1xfPwCOaybGU987Hlvezr95sksfHw2B20nz8PAVy9DMvEKtJ36Vc12npgAcrztqQ28ZlZ88VTYFx+b9LWnoeJQBt4fzKnikv1nsrDkYBrImXJTDq+bEd/B9EJvPD2qCjLln2cg2jMOu/AdeAOpPzIOpV2Z28+ZP2mXjyl8vPGxT/MKzoCxT/iYAqcb5mCh63cXvDfwnbxGZ/BphYvns0yFruBM8HZklvJxhcvjHamQrtxMKO0cXc/HFS653k3RU9/uPV3WMZLVlfw3aId26Qw+rnBxjzsx+h2V7asdjn758wVdYR3k0o76DYZn8HGFy/RFiNHeLed1pXWQO71XvMj/meJFihe5T5EX+b2n4TddaR3kGnURSEa8bn/4Fyp0tSc6rCutg1x1CbUb8fJxhQ2cXjMX+p0913tqz616/QDcC+TSDu3yMebk7ZYX19qxbSAJMPlzcnnNvFixrY/lF7a2vKS4a44ur5mXmthr8/MLV9W9oMifk8trZiYQbbolC6+ubVTIGTmsmxv8PPwhSz8XaVDIGTmsmxs71jQsS1c69Qo5I4d1c4NFh2TplaFahZwhQ6ybG/y3OSFLP7MuopAzclg3N1i0W5ZeEXAUcoZ0s25u8BupS5Ze5g8q5Iwc1s0NFm2VpSvWVCvkDGll3dzgN9JuWfqpVZZCzshh3dzgB7lZln6ycq1Czshh3dzYjdvqZOlFz65WyBk5rJsbK9YckKWfWFGpkDNyWDc3WLQCv5VGCAspe7rSJej19Jwc1ou5MyUlfwFPLZECWlJrYwAAAABJRU5ErkJggg==`;
    // this.fuelpump = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARKSURBVGhD7ZZvTBNnHMfrjAX1hdmLZb4ye7FXM1tMfLEsskxIZGYvli2jS4bYXhfsNmPwH4Z/194YdNQ7mC4aREP8M2gVlMFUooJKa0MYG7iACIiwQvgrTOYM1RCX/vY81+cuVyjS9rgryfpJviHP77n2+X36PMedJkaMGDHmAU3xCT6ntsLn0raAM65NTtB3uH3OuCPgjt9Avl4dfHe0+9HCPnDFwRLnic8Z/x5ZRlmQxFs+V9y/QZpYkqDdGYQujZYspxxoJwqERafakuHmaBc0jvfIStNwK7xwvy7KPLy5+ROynHKgX+ycsOCvg3VweerpS/Pdpatw8rfOoHPSeDp2iSIldaXDCVVPXyNLKgM6VvaFROrGp2FH1rdQ5RkTa6bvj0BJg0sc5/10Eay118SxEE/n16KItfYcJFV6uxSVeZkITsbRMrBdaRTHPza1QEWPRxzr9uXCiZY/xLEQqQhXWzaZZPcqKzNXxFp3HcpaO8SG8G7UjPwV0KQ0FT1/wi+T/4jjQ6cqoLz9foBIf+OmjKTKGY+iMnNFjt5qhk93ZwYcp1CDP5uSkc1/Viric65K/eD88zcUlQl2tM7e6wv4lUMKuv7n8cfg6Bvix3NF8FqKyix2j4SShp5+aOzuC6gFE8Ek2meyeRFBxv7kVTIlD7kiLncztJ93zKuHJIKSWOm1kil5yBFpd9hhgMnhj9XcuVBFUOxkSh7hipzpfAAXej3wwFYA4+mpUD86FfS6ZS2y54dS2JaaDh+iXPz8M7jROxD0Opyoigx1GKH+0QTKo3mpftgPaZk0pFMm2JX2JezJzQ96Hc61iSHwtrwZVGSrw/vutrMTd7eX93cnnx65l2R/piNT8pCKKBWpCIbKY7+izBwYzGwNKcknGiJGmkvBIpSZdZGSfKKyI+bD7xORMVKSTzRETAyzhqK5WSyjp20bSVke0RDB4GPF3yc0W0BK8oiWiJ5m9URkKmV/yWpSjhw1RCy2A7dR09NoF0bQ3+M6XfVKHcNoDTQ3zMuY2WzSTuSoIZJTdKgZNywE7QKF16ZoNpWv0ezfpizbOr6hSFFD5O6lt/cazMWbUdNn/I1zRf7VYQXaDb8kzeX4axGi5j2CBQJFNBoksgXX8L2SdpBbS8rhE20RDLpX2nEdPyhJKXyWhwhr5XfFzJWSUvgsBxHKwhmISD0phY+qImaukG+YZo/xixMoC6vz17k7pBQ+aooYLNxO/y/PDgr/bhmGeQU9X2pxHe3UKVyLCDVFyDvWkCCDjlIZyu9EYlbPsO/wTUWCmiIY3KwgIwQdKa/RUvwFuSQy1BbB4HcrI82mIYlCYx77jYFh15OpyImGyJKgp4s/Rq8LJiE1pz9qbXIkgJIpPb6zXLrmQsG9kTYXB91kbun5XE7BvZE2FycmokLCEkHv/uXoAdQm5ICVHsu1ZXqVzO78/D7pmgsG9UbajBEjxv8PjeY/kppuc52D1QoAAAAASUVORK5CYII=`;
    // this.shop =`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARcSURBVGhD7ZRdTJNXGMffLKadJHObuiw6prbqjTNj2XYzliwz24UzaDI1FDGRxY9rtmzO3RgvdMLNsumMzI8gjsypAfETDFgoXynKMgQrlWB1ihoHi4F+UEzgPDvP8TRpz3mwrRnQuvef/MJLz/+c5//n7cEwZcqUqedDbG3mdJZr/55Tyxz2uikFM+Tad2EmGS9xYQlw2CGVYA7bThkvcbFcWwN12FSCmWS8xMXbN1OHTSWYScZLXM9PkaMvH4NfZ7iiYVvnVEOuzRUN+3pujeY7+Mol1RdBrKl+PEP14SzVxzPJeImJuSyLmcvKoNEK0bDCN7zaX6rkVZfmq7fc13wSsab4xRmqD2cpPsyE2WTM+OIbdqqHgMs6yPLso9rAky81qt5ki4gzVB/O4jM1L88mYz5dAMYLvPUd7YALGZfVYWJgdUa75k22CJ5BeXGm6sVsPKOMO76gwfqpulmwf6b2+sUw54s+1Zt0ETyD8IqZilfAM8q444s3Lqc2k/eDw1/1sOZNtgieQXmJe/LEbymXcWmxNmMGPzSkbebf1TGHnWmDvpg/oHk5POwD1RtBrFF78CzFK2bS9ySEWWVsXazJukXdhIxWZtxUh4hBW1/vo/zMaQlQfkSsEXtGv+FnEX4xm/BjVhlbF6uZ1gG1FlAJ75n5d3jNfFAZKZrdT/nHLlpDlB9hfI3aM1I0q5/y42zKj1llbF3siFEHZfwfl4Lv5wK48clrGr59BZoX8Vd9CN7PMvU9y98E/6lsck+yM1iZUStj62JHjRx1Q7DiHeh0t4B3pT12yMqF0NnWCqGKrBg/4nMfBs/uwlg/x1P0JfjaDmr+Z5nBSo0VMjYt3nRV6OSSoZHjC2CgJh+6PH9Ax42bcLWhFq5/tRq8jizxs7OhTnyO6/9UrwP0Byvfh1vuA+Lzju4euLZ3B3QXZAvwGT/DNfSg91lmYDbMKOM+XX96e5tFmBQEs8mY8fW/KNJzbwD6/GMTSs+DR+Rs5D8t8sOVx/D24WBclh4IwNzvPAJ8pjwR3isNwooTIdjeGJ68IsXuEbDtD8Rlwb4hmPNtlwCfKc/SQ1ggCBvPD8PmC8OwrT7NirzL38DnFSERPpq0KGIvCcAHZUFwVMWGjya1i2y7Btllflh/Rn8DKilZZHHJEGTu6IV5u+/B+qoAGVwlpYpELnD+qQDMK74vSKsi6gXG8GlTJPoCb+JBPi59BKt+HxKhqCK4tox70BtdIMKkF1n0SxA+Kg/GXODIV2nJTw/F71SRt/ga/p4/zhua1CLbm8JQcE4PgeT8Ngh5lU9CUkUcfC3n2GDMnmgmtQgOo0KoUEXiYRah5Gq/esR5paOJovOvh7cnuojnTv9dajaC2WTM+DrtbG0+Xd8KFG3e2xP+Rtp7+sjZAp5Nxowvs4jC1Bepb/mxytlSR9Hi6e3a1RQIbzgbYPHIq/QzW/FdQPCZ8qjg2e7uW9ep2QhmkzFNmTJlKm1lGP8COvpOliMQT/QAAAAASUVORK5CYII=`;
    
        this.man = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPgSURBVGhD7ZZ/aNR1GMcX+q+EGEn/dHdBW9PMoVY4TN197zu92/e8nJvubkTZXFloEoQTApWiVvZPq24/MqMDIxiky7adM1FKGOX+EEH/KOd/goG2drtzu5P5fXqez57Z4/mpHCT3GdwbXux4vq/nw/vD7Y4rKeY/4vf7qzBH8e9VZAT5kR/NnuAF3sPioGEIeRWVB6ZMg4NF60Txf+Id1s0NljwnS4eDFnywsxrOtofg4qGQa/mrJnF+DVVz3xXLshZQ+WC1Bfu32/BTWxBy34cBkn9zrDWoLmjbto/XzAt+NpY2RKybN75z7iifT+NGK4eXXsJr5qWluXpT0+aAtryEnLe22ht5zbz0fRT0tzTZ2vIScsjlNfMCP9Q/mDpaM6krL1EOurxmZtxkuE9XXoLOMdbNjdsbKod+Z1R3AQU+c5Mbylg3OzBQs9ztdy7nXwJnl9yks4y12RH4+pGHILEQ4JvSKRIPg5uYt4Afz54cPvyuBzpLQNKd2PcoPzY/5V+Me3YMTFz8cHDCvdLpuX2JS12L4cBg1t1xfPwCOaybGU987Hlvezr95sksfHw2B20nz8PAVy9DMvEKtJ36Vc12npgAcrztqQ28ZlZ88VTYFx+b9LWnoeJQBt4fzKnikv1nsrDkYBrImXJTDq+bEd/B9EJvPD2qCjLln2cg2jMOu/AdeAOpPzIOpV2Z28+ZP2mXjyl8vPGxT/MKzoCxT/iYAqcb5mCh63cXvDfwnbxGZ/BphYvns0yFruBM8HZklvJxhcvjHamQrtxMKO0cXc/HFS653k3RU9/uPV3WMZLVlfw3aId26Qw+rnBxjzsx+h2V7asdjn758wVdYR3k0o76DYZn8HGFy/RFiNHeLed1pXWQO71XvMj/meJFihe5T5EX+b2n4TddaR3kGnURSEa8bn/4Fyp0tSc6rCutg1x1CbUb8fJxhQ2cXjMX+p0913tqz616/QDcC+TSDu3yMebk7ZYX19qxbSAJMPlzcnnNvFixrY/lF7a2vKS4a44ur5mXmthr8/MLV9W9oMifk8trZiYQbbolC6+ubVTIGTmsmxv8PPwhSz8XaVDIGTmsmxs71jQsS1c69Qo5I4d1c4NFh2TplaFahZwhQ6ybG/y3OSFLP7MuopAzclg3N1i0W5ZeEXAUcoZ0s25u8BupS5Ze5g8q5Iwc1s0NFm2VpSvWVCvkDGll3dzgN9JuWfqpVZZCzshh3dzgB7lZln6ycq1Czshh3dzYjdvqZOlFz65WyBk5rJsbK9YckKWfWFGpkDNyWDc3WLQCv5VGCAspe7rSJej19Jwc1ou5MyUlfwFPLZECWlJrYwAAAABJRU5ErkJggg==`;
         this.fuelpump = `data:image/png;base64,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
`;
         this.shop =`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQbSURBVFiFtZdvTFVlHMc/55x7zv3Dvy4s4BYodXVEQeUk1soJLG1jY2v9sRzDJKFysppTZ5NeFC9cs+VqlSu20DGn05pb5QtrqxD0hTMqIPCmZuT1Ty3lIiAX5N5znl6ACfccuOeC/baz3fN9fr/v73PPeZ5zniMJIbAda1dkoOqPAMVgFCOk4r8PXsyWkxwhR5ISwKW0S6p00NvV1WPXUrIF0CjJBEs3AtsB19ShSy1BhD7FQwbPQk/7jXR3ha+jIxzPWo7bvOYJP8HSNmBnbHPLMCDcF14unxu6cu3BJU/ND6C27GkUvQtYFrdxTESuRTwjpwa/HMgvbJobwMvlOcAeICnR5jdD6ILwufArgw8XPZk4gC52A2mzNfjGU8LeklfjQoxdGD9EYaFmH6C2fD0SK2cyDUsu6jM3UnH3u7T71/Da6kOEPBkzQkRC48n9Yb62GjOvgsZyB0ERAlKsCk66CliT1cAZLRefI0xh7yBaxGBcgWc6P6Sy+3NLCEmW8C5x3eXpOPXXVN18BYLSA1bNo5LC2xk1PJ7zMWe0XJ7zj/NrvYdt60cRWSqaDoeLXmfrsy2MqW6TrTAE0VF1VaxucQv04ljltJbLYzm7aEyvwaNJtFTCF6s0MtzgS4vyXt0A+cskdEViyOVnQ9W3HFu0wuw8pptEqzkwDWBATqEk91N+dN1HaeYo3XUyLxaai+pKh9mwboyI14EWldn7aCO/ZxZMy4mM6g/F1jnMVtLSqWdeY5iG0D5kDDZXrURO8wNwYQguXYeffnOTnRrlft84izMjfFQ/yPubegg7U1j0T2CaszEc9dkAQIkV3hjYP8l2a2Hs+hl2nICKXgVtgcY71ePAxCV988hmC1vrsLoF521XJxiSWxmyAxCw0G5LKG7Z9OfMAIY48H8BqCnqJ7Ga9eu4tqwDWGrS8/LBObHG/yCDoPDSe95HLv0U630TOSOjGPu+MpU6kh2R7OGzpsex1SQEIbYiSd+b9D9P//fz3slj8eR+wLA0uhXOHPdOK936XbC77QeE1BLH03Y4s1yXvYHubfYBAFS2AFfn21xWZaFmOytnHJ+xsqn1KpLYMl8AV577wB2dnb8kDgDwWVsLgsNzba7e6exPP9tbPVtO/D2h7ngJuJhoc9klG5rPWYYQs87P+AAt3/VjUAXoiQAk+ZMa7GzP4wMA7Dl6DGi029yz0HMirad7h51cewAAC9q2A63x0tR07frQPeFyu7b2Ad4SBkSrgSszmqmy0HzuirzWvrHbDwDQfPwysBaw/Jxy+ZM+8PZ0Hk/EMjEAgOajRxDC9Fh15boD6YHuTYnaJQ4AoI40ACdvniqpjhtaqpzw19PcAZo6IshiNTAoKZJwL0x+IbWnJzQnLyHE3I91y58fKChqno/Hv3TTo6o/aqMnAAAAAElFTkSuQmCC`;
         this.house = '../../assets/house.png';
         
    this.mapstyle = [
      {
          "featureType": "water",
          "stylers": [
              {
                  "saturation": 43
              },
              {
                  "lightness": -11
              },
              {
                  "hue": "#0088ff"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "hue": "#ff0000"
              },
              {
                  "saturation": -100
              },
              {
                  "lightness": 99
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#808080"
              },
              {
                  "lightness": 54
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ece2d9"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ccdca1"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#767676"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "poi",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#b8cb93"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.sports_complex",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.medical",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.business",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      }
  ]
   }
}
